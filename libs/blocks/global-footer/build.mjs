import { build } from "esbuild";

await build({
  entryPoints: ['global-footer.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  outfile: '../../../dist/global-footer/global-footer.js',
})