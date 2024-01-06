export default [
  {
    context: [
      '/api',
      '/sanctum',
      '/login',
      '/logout',
      '/register'
    ],
    "changeOrigin": true,
    "target": "http://localhost/formero/public",
    "secure": false,
    "logLevel": "debug",
  }
];
