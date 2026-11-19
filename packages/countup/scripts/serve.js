const port = Number(process.env.PORT || 8888);

require('esbuild').serve(
  {
    servedir: 'example',
    port,
  },
  {
    entryPoints: ['example/index.jsx'],
    outdir: 'example/js',
    bundle: true,
    loader: { '.js': 'jsx' },
  },
);
