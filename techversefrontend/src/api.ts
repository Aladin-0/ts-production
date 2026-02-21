// src/api.ts - Updated to fetch CSRF token from API
import axios from 'axios';

// Helper to get API URL from env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // CRITICAL: Include cookies for session auth
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cache for CSRF token
let csrfTokenCache: string | null = null;

// Function to fetch CSRF token from API
async function fetchCSRFToken(): Promise<string> {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/csrf/`, {
            withCredentials: true
        });
        csrfTokenCache = response.data.csrfToken;
        return csrfTokenCache;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        return '';
    }
}

// This interceptor adds the auth token and CSRF token to every request
apiClient.interceptors.request.use(async (config) => {
    // Add JWT token if available (for backward compatibility)
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach CSRF token for unsafe methods
    const method = (config.method || 'get').toUpperCase();
    const unsafe = method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS';
    
    if (unsafe) {
        // Fetch fresh CSRF token for each unsafe request
        const csrfToken = await fetchCSRFToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    
    return config;
});

// This interceptor handles token errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // If JWT token is invalid or expired, remove it
            const token = localStorage.getItem('access_token');
            if (token) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
