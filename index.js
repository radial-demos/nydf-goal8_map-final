'use strict';

/*
  Browser-Sync server for serving static content
*/

const bs = require('browser-sync').create();

bs.init({
  server: {
    baseDir: 'public',
    index: 'index.html',
    directory: false,
  },
  port: 8080,
  open: false,
  files: ['./public'],
  serveStatic: [{
    directory: true,
    route: '/',
    dir: './public',
  }],
});
