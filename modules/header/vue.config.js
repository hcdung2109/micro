const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    output: {
      filename: 'js/app.js',
      libraryTarget: 'system'
    }
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  }
})
