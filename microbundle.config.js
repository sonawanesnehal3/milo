const { defineConfig } = require('microbundle');

module.exports = defineConfig({
  entry: './libs/blocks/global-footer/global-footer.js', // Use `entry` instead of `entries`
  output: 'dist/global-footer/global-footer.js',
  format: ['cjs', 'esm'],
  sourcemap: true,
  compress: false,
  babelConfig: {
    presets: ['@babel/preset-env']
  }
});