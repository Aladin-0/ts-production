// src/stores/productStore.ts

import { create } from 'zustand';
import axios from 'axios';
import apiClient, { API_BASE_URL } from '../api';

// Define the shape of a single product
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

// Define the shape of an address
interface Address {
  id: number;
  street_address: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

// Define the shape of our store's state
interface ProductState {
  products: Product[];
  addresses: Address[];
  fetchProducts: () => Promise<void>;
  fetchAddresses: () => Promise<void>;
}

// Create the store
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addresses: [],
  fetchProducts: async () => {
    try {

      // Use direct axios for public endpoints
      const response = await axios.get(`${API_BASE_URL}/api/products/`, {
        timeout: 5000
      });

      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Set empty array on error so UI shows "no products" instead of loading forever
      set({ products: [] });
    }
  },
  fetchAddresses: async () => {
    try {

      const response = await apiClient.get('/api/addresses/');

      set({ addresses: response.data });
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      set({ addresses: [] });
    }
  },
}));