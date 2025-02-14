const nextConfig = {
  optimizeFonts: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?mjs$/,
      type: 'asset/resource',
    });

    return config;
  },
  optimizeDeps: {
    exclude: ['canvas'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: false,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost',
        '*.salesforce.com',
        '*.*.salesforce.com',
        '*.*.*.salesforce.com',
        '*.site.com',
        '*.*.site.com',
        '*.*.*.site.com',
        '*.force.com',
        '*.*.force.com',
        '*.*.*.force.com',
      ],
    },
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.salesforce.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.force.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
