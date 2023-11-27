module.exports = {
  i18n: {
    locales: ['en'], // Add your languages here
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '35.172.151.238',
        port: '3003',
        pathname: '/uploads/**',
      },
    ],
  },
}
