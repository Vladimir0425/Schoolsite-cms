module.exports = {
  i18n: {
    locales: ['en'], // Add your languages here
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plankton-app-vkwlv.ondigitalocean.app',
        port: '80',
        pathname: '/uploads/**',
      },
    ],
  },
}
