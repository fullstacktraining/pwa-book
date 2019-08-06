const workboxBuild = require('workbox-build');

const buildServiceWorker = async () => {
  try {
    const build = await workboxBuild.injectManifest({
      swSrc: 'service-worker.dev.js',
      swDest: 'service-worker.js',
      globDirectory: '.',
      globPatterns: [
        'node_modules\/bootstrap\/dist\/css\/bootstrap.min.css',
        'node_modules\/bootstrap\/dist\/js\/bootstrap.bundle.min.js',
        'node_modules\/jquery\/dist\/jquery.min.js',
        'assets\/icons\/*.png',
        '*.{js,css,html}',
      ],
      globIgnores: ['**/service-worker.dev.js', 'build.js']
    });
    console.log(`${build.count} files will be precached, totaling ${build.size} bytes.`);
  } catch(error) {
    console.error(error);
    throw new Error(error);
  };
}

buildServiceWorker();