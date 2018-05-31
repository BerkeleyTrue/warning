'use strict';

var vm = require('vm');
var browserify = require('browserify');
var minify = require('uglify-js').minify;
var envify = require('loose-envify');

var file = __dirname +
  '/package/' +
  process.env.NODE_ENV +
  '.js';

function getBundler() {
  return browserify({
    entries: file,
    standalone: 'package',
    transform: [envify],
  });
}
test('node', function() {
  require(file)();
});

test('browserify source', function() {
  return new Promise((res, rej) => {
    var b = getBundler();
    b.bundle(function(err, src) {
      if (err) { return rej(err); }

      var minified = minify(String(src)).code;
      console.log('minified: ', typeof minified);

      expect(minified)
        .toEqual(expect.not.stringMatching(/\bprocess\.env\.NODE_ENV\b/));
      expect(minified)
        .toEqual(expect.not.stringMatching(/__DEV__/));

      return res();
    });
  });
});

test('browserify test in context', function() {
  return new Promise((res, rej) => {
    var b = getBundler();
    b.bundle(function(err, src) {
      if (err) { return rej(err); }

      var c = {
        console: {},
        expect: expect,
        jest: jest,
      };

      vm.runInNewContext(src, c);
      c.package();

      return res();
    });
  });
});
