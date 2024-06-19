// import { defineConfig } from 'vite';
// import path from 'path';

// export default defineConfig({
//   build: {
//     target: "esnext",
//     minify: false,
//     lib: {
//       entry: path.resolve(__dirname, 'libs/blocks/global-footer/global-footer.js'),
//        name: 'GlobalFooter',
//        fileName: `global-footer`,
//     },
//     outDir: path.resolve(__dirname, 'dist/global-footer'),
//     rollupOptions: {
//       // Make sure to externalize deps that shouldn't be bundled
//       external: [],
//       output: {
//         globals: {},
//         inlineDynamicImports: true, 
//         assetFileNames: (assetInfo) => {
//           if (assetInfo.name === 'style.css') return 'global-footer.css';
//           return assetInfo.name;
//         }
//       }
//     }
//   }
// });

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'libs/blocks/global-footer/index.js'),
       name: 'GlobalFooter',
       fileName: `global-footer`,
       //fileName: (format) => `global-footer.${format === 'es' ? 'js' : 'umd.js'}`, // This will generate .js instead of .mjs
    },
    outDir: path.resolve(__dirname, 'dist/global-footer'),
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
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