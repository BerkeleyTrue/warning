'use strict';

var browserify = require('browserify');
var test = require('tap').test;
var vm = require('vm');
var minify = require('uglify-js').minify;

var file = __dirname + '/package/' + process.env.NODE_ENV + '.js';

test('node', function(t) {
  t.plan(5);
  require(file)(t);
});

test('browserify', function(t) {
  t.plan(8);
  var b = browserify({
    entries: file,
    standalone: 'package'
  });
  b.bundle(function(err, src) {
    t.notOk(err);
    var minified = minify(src).code
    t.notMatch(String(minified), /\bprocess\.env\.NODE_ENV\b/);
    t.notMatch(String(minified), /__DEV__/);
    var c = {console: {}};
    vm.runInNewContext(src, c);
    c.package(t);
  });
});
