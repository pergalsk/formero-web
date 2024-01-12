export default [
  {
    context: [
      '/api',
      '/sanctum',
      '/login',
      '/logout',
      '/register',
      '/forgot-password',
      '/reset-password',
    ],
    changeOrigin: true,
    target: 'http://localhost/formero/public',
    secure: false,
    logLevel: 'debug',
  },
];
