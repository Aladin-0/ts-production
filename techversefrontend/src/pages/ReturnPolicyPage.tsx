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

export const ReturnPolicyPage: React.FC = () => {
    return (
        <PageWrapper>
            <ContentWrapper>
                <PageHeader>
                    <Title>Return Policy</Title>
                    <Subtitle>Simple and transparent return process</Subtitle>
                </PageHeader>

                <UpdateDate>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</UpdateDate>

                <Section>
                    <h2>1. 7-Day Return Policy</h2>
                    <p>
                        At Techverse Services, we want you to be completely satisfied with your purchase.
                        We offer a <strong>7-day return policy</strong>, which means you have 7 days after receiving your item to request a return.
                    </p>
                </Section>

                <Section>
                    <h2>2. Eligibility for Returns</h2>
                    <p>To be eligible for a return, your item must meet the following criteria:</p>
                    <ul>
                        <li>The item must be in the same condition that you received it, unworn or unused.</li>
                        <li>It must be in its original packaging with all tags, manuals, and accessories intact.</li>
                        <li>You must provide the receipt or proof of purchase.</li>
                    </ul>
                    <p>
                        Items that are damaged, missing parts, or not in their original condition for reasons not due to our error may not be eligible for a full return.
                    </p>
                </Section>

                <Section>
                    <h2>3. Non-Returnable Items</h2>
                    <p>Certain types of items cannot be returned, including:</p>
                    <ul>
                        <li>Custom-configured PCs or servers (unless dead on arrival).</li>
                        <li>Software licenses that have been activated or seal broken.</li>
                        <li>Perishable goods or hazardous materials.</li>
                        <li>Gift cards.</li>
                    </ul>
                </Section>

                <Section>
                    <h2>4. Initiating a Return</h2>
                    <p>
                        To start a return, you can contact us at <strong style={{ color: 'white' }}>support@techverse.com</strong>.
                    </p>
                    <p>
                        If your return is accepted, we will send you a return shipping label, or instructions on how and where to send your package.
                        Items sent back to us without first requesting a return will not be accepted.
                    </p>
                </Section>

                <Section>
                    <h2>5. Damages and Issues</h2>
                    <p>
                        Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item,
                        so that we can evaluate the issue and make it right immediately.
                    </p>
                </Section>

                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />

                <Section>
                    <p>
                        For any return-related questions, please contact us at support@techverse.com.
                    </p>
                </Section>
            </ContentWrapper>
        </PageWrapper>
    );
};
