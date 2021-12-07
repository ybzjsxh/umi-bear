// ref: https://umijs.org/config/
export default {
  hash: true,
  antd: {
    dark: true,
    compact: true,
  },
  mfsu: {},
  dva: {},
  dynamicImport: {},
  title: 'umi-bear',
  // routes: [
  //   {
  //     path: '/',
  //     component: '@/layouts/index',
  //     routes: [
  //       { path: '/home', component: 'home' },
  //       { path: '/article', component: 'article' }

  //     ]
  //   },
  // ],
  devServer: {
    port: 3000,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
};
