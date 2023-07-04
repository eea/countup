require('esbuild').serve(
  {
    servedir: 'example',
    port: 8888,
  },
  {
    entryPoints: ['example/index.jsx'],
    outdir: 'example/js',
    bundle: true,
  },
);
