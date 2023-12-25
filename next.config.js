/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    async headers() {
        return [
            {
                // Routes this applies to
                source: '/api/external/get-flag',
                // Headers
                headers: [
                    // Allow for specific domains to have access or * for all
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    // Allows for specific methods accepted
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    // Allows for specific headers accepted
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
