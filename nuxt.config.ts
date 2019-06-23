import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  srcDir: 'src/',
  mode: 'spa',

  generate: {
    subFolders: false
  },

  env: {
    BASE_URL: process.env.API_HOST ? `https://${process.env.API_HOST}` : 'http://localhost:3030'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'パーティご招待',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'description'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  // https://developer.mozilla.org/en-US/docs/Web/Manifest
  manifest: {
    name: '招待状'
  },

  loading: { color: '#fff' },
  css: ['@/assets/postcss/main.css'],
  plugins: [],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#00BCD4',
      success: '#00BCD4',
      info: '#00BCD4',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },

  extensions: ['.js', '.ts', '.vue', '.css', '.html'],

  build: {
    extend(config: any, context: any) {
      console.log(`======= ${process.env.API_HOST}`);
    },
    cssSourceMap: true,
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-mixins': {},
        'postcss-preset-env': {},

        'postcss-nested': {},
        // css minify
        csswring: {}
      }
    }
  }
};

module.exports = config;
