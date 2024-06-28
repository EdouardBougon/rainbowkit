/** @type {import('next').NextConfig} */
module.exports = {
  // Target must be serverless
  // output: 'export',
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      'ar-AR',
      'en-US',
      'es-419',
      'fr-FR',
      'hi-IN',
      'id-ID',
      'ja-JP',
      'ko-KR',
      'pt-BR',
      'ru-RU',
      'th-TH',
      'tr-TR',
      'uk-UA',
      'vi-VN',
      'zh-CN',
      'zh-HK',
      'zh-TW',
    ],
  },
  reactStrictMode: true,
};
