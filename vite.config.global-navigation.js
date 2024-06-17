// import { defineConfig } from 'vite';
// import path from 'path';

// export default defineConfig({
//   build: {
//     target: "esnext",
//     minify: false,
//     lib: {
//        entry: path.resolve(__dirname, 'libs/blocks/global-navigation/global-navigation.js'),
//        name: 'GlobalNavigation',
//        fileName: `global-navigation`,
//     },
//     outDir: path.resolve(__dirname, 'dist/global-navigation'),
//     rollupOptions: {
//       input: {
//         main: path.resolve(__dirname, 'libs/blocks/global-navigation/global-navigation.js'),
//         css: path.resolve(__dirname, 'libs/blocks/global-navigation/global-navigation.css')
//       },
//       external: [],
//       output: {
//         globals: {},
//         //inlineDynamicImports: true, 
//         entryFileNames: '[name].js',
//         assetFileNames: '[name].css',
//         assetFileNames: (assetInfo) => {
//           if (assetInfo.name === 'style.css') return 'global-navigation.css';
//           return assetInfo.name;
//         }
//       }
//      }
//   }
// });

//////////
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