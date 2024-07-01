import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'libs/blocks/global-footer/footerbuild.js'),
      name: 'GlobalFooter',
      formats: ['es'], 
      fileName: (format) => `global-footer.js`,
    },
    outDir: path.resolve(__dirname, 'libs/deps/global-footer'),
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true, 
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'global-footer.css';
          return assetInfo.name;
        }
      }
    }
  }
});