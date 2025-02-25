/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // This enables static site export
  reactStrictMode: true,
  images: {
    unoptimized: true // Needed for static export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // basePath: '/dreams2', // Match your subdirectory
  // assetPrefix: '/dreams2/', // Ensure assets load correctly

    async rewrites() {
      return [
        
        { source: '/login', destination: '/public/login' },
        { source: '/termsServicesCheckbox', destination: '/public/termsServicesCheckbox' },
        { source: '/access-denied', destination: '/public/accessDenied' },

        // other routes
        { source: '/dashboard', destination: '/private/dashboard' },
        { source: '/profile', destination: '/private/investorProfile' },

        { source: '/dividends', destination: '/private/dividends' },
        { source: '/all-property-dividends', destination: '/private/allPropertiesDividends' },
        { source: '/available-properties', destination: '/private/availableProperties' },
        { source: '/buy-secondary-tokens', destination: '/private/buySecondaryTokens' },
        {
          source: '/investor-property-details/:id',
          destination: '/private/investorPropertyDetails/:id',
        },
        { source: '/investor-verification-preview', destination: '/private/investorVerificationPreview' },
        { source: '/secondary-market-tabs', destination: '/private/secondaryMarketTabs' },
        { source: '/transaction-history', destination: '/private/transactionHistory' },
        { source: '/notification', destination: '/private/notification' },
      ];
    },
};

export default nextConfig;

  