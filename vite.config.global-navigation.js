import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: "esnext",
    minify: false,
    lib: {
       entry: path.resolve(__dirname, 'libs/blocks/global-navigation/global-navigation.js'),
       name: 'GlobalNavigation',
       fileName: `global-navigation`,
    },
    outDir: path.resolve(__dirname, 'dist/global-navigation'),
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true, 
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'global-navigation.css';
          return assetInfo.name;
        }
      }
     }
  }
});