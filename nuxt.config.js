var webpack = require('webpack');

module.exports = {
  buildDir: 'test',
  axios: {
    credentials: false
  },
  router: {
    base: '/',
    // mode: 'hash'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'bolg',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Where speech is truly free' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Open+Sans:700,800|Material+Icons' },
      { rel: 'stylesheet', href: '/katex.min.css', type: 'text/css' },   
    ],
    script: [
      { src: 'https://connect.facebook.net/en_US/all.js' },
      { src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js' },
      { src: 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js' },
      { src: '/katex.min.js' },
    ]
  },
  plugins: [
    { src:'~plugins/vuetify.js', ssr: true },
    { src: '~plugins/vue-cookie.js', ssr: false, injectAs: 'cookie' },
    { src: '~plugins/vue-session.js', ssr: false },
    { src: '~plugins/filters.js', ssr: false },
    { src: '~plugins/quillImageResize.js', ssr: false },
    // { src: '~plugins/quillImageVideoResize.js', ssr: false },  
  ],
  css: ['~assets/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    publicPath: 'test',
    vendor: ['axios', 'vuetify'],
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
