import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Divider } from '@mui/material';

const PageWrapper = styled(Box)({
    backgroundColor: '#000000',
    color: 'white',
    fontFamily: "Arial, sans-serif",
    minHeight: '100vh',
    width: '100%',
    paddingTop: '80px',
});

const ContentWrapper = styled(Container)({
    padding: '60px 24px',
    maxWidth: '900px !important',
});

const PageHeader = styled(Box)({
    textAlign: 'center',
    marginBottom: '48px',
});

const Title = styled(Typography)({
    fontSize: '48px',
    fontWeight: 700,
    fontFamily: "Arial, sans-serif !important",
    letterSpacing: "normal !important",
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '@media (max-width: 600px)': {
        fontSize: '32px',
    },
});

const Subtitle = styled(Typography)({
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.6)',
});

const Section = styled(Box)({
    marginBottom: '40px',
    '& h2': {
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: "Arial, sans-serif !important",
        letterSpacing: "normal !important",
        textTransform: "none !important",
        color: 'rgba(255, 255, 255, 0.95)',
        marginBottom: '20px',
        marginTop: '32px',
    },
    '& p': {
        marginBottom: '16px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '16px',
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.7,
    },
    '& ul': {
        paddingLeft: '24px',
        marginBottom: '24px',
        fontFamily: "Arial, sans-serif",
        '& li': {
            marginBottom: '10px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px',
            lineHeight: 1.7,
            fontFamily: "Arial, sans-serif",
        },
    },
});

const UpdateDate = styled(Typography)({
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '24px',
    fontStyle: 'italic',
    textAlign: 'center',
});

export const RefundPolicyPage: React.FC = () => {
    return (
        <PageWrapper>
            <ContentWrapper>
                <PageHeader>
                    <Title>Refund Policy</Title>
                    <Subtitle>Fast and secure refund processing</Subtitle>
                </PageHeader>

                <UpdateDate>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</UpdateDate>

                <Section>
                    <h2>1. Refund Eligibility</h2>
                    <p>
                        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not.
                        If approved, you’ll be automatically refunded on your original payment method.
                    </p>
                </Section>

                <Section>
                    <h2>2. Refund Timelines</h2>
                    <p>
                        Once your return is inspected and approved, the refund process is initiated immediately. However, it can take some time for your bank or credit card company to process and post the refund.
                    </p>
                    <ul>
                        <li><strong>UPI / Wallet Payments:</strong> Typically processed within 1-3 business days.</li>
                        <li><strong>Credit / Debit Cards:</strong> Typically processed within 7-9 business days, depending on your bank's policy.</li>
                        <li><strong>Net Banking:</strong> Typically processed within 5-7 business days.</li>
                    </ul>
                    <p>
                        If more than 15 business days have passed since we approved your return and you still have not received your refund, please contact us at support@techverse.com.
                    </p>
                </Section>

                <Section>
                    <h2>3. Cancellation Refunds</h2>
                    <p>
                        If you cancel an order before it has been shipped, the entire amount will be refunded to your source account within 7 working days.
                    </p>
                    <p>
                        If the order has already been shipped, you must wait for it to arrive and then initiate a return process as per our Return Policy.
                    </p>
                </Section>

                <Section>
                    <h2>4. Late or Missing Refunds</h2>
                    <p>
                        If you haven’t received a refund yet:
                    </p>
                    <ul>
                        <li>First check your bank account again.</li>
                        <li>Contact your credit card company; it may take some time before your refund is officially posted.</li>
                        <li>Contact your bank. There is often some processing time before a refund is posted.</li>
                    </ul>
                </Section>

                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />

                <Section>
                    <h2>5. Service Refunds</h2>
                    <p>
                        For services rendered (e.g., repairs, installation), refunds are only applicable if the service was not performed satisfactorily or issues persist immediately after service delivery. Diagnosis fees are generally non-refundable.
                    </p>
                </Section>

            </ContentWrapper>
        </PageWrapper>
    );
};
