'use strict';

var browserify = require('browserify');
var test = require('tap').test;
var vm = require('vm');

var file = __dirname + '/package/' + process.env.NODE_ENV + '.js';

test('node', function(t) {
  t.plan(3);
  require(file)(t);
});

test('browserify', function(t) {
  t.plan(6);
  var b = browserify({
    entries: file,
    standalone: 'package'
  });
  b.bundle(function(err, src) {
    t.notOk(err);
    t.notMatch(String(src), /\bprocess\.env\.NODE_ENV\b/);
    t.notMatch(String(src), /__DEV__/);
    var c = {console: {}};
    vm.runInNewContext(src, c);
    c.package(t);
  });
});
