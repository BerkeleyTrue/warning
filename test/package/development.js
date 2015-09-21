module.exports = function(t) {
  var warning = require('../../');

  t.throws(function() {
    warning(true);
  }, /requires a warning/i);

  t.throws(function() {
    warning(false);
  }, /requires a warning/i);

  t.throws(function() {
    warning(true, 'short');
  }, /use a more descriptive format/i);

  t.throws(function() {
    warning(false, 'short');
  }, /use a more descriptive format/i);

  var error = console.error;

  console.error = function(msg) {
    t.match(msg, /warning: warning message/i);
  };
  warning(false, 'warning message');

  console.error = function(msg) {
    t.ok(true); // should not be called
  };
  warning(true, 'warning message');

  console.error = error;
};
