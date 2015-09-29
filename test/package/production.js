module.exports = function(t) {
  var warning = require('../../');

  t.doesNotThrow(function() {
    warning(true);
  });

  t.doesNotThrow(function() {
    warning(false);
  });

  t.doesNotThrow(function() {
    warning(true, 'short');
  });

  t.doesNotThrow(function() {
    warning(false, 'short');
  });

  var error = console.error;

  console.error = function(msg) {
    t.ok(true); // should not be called
  };
  warning(false, 'warning message');
  t.ok(true); // so the test plan count matches development

  console.error = function(msg) {
    t.ok(true); // should not be called
  };
  warning(true, 'warning message');

  console.error = error;
};
