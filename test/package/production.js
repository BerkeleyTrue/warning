module.exports = function() {
  var warning = require('../../');

  expect(function() {
    warning(true);
  }).not.toThrow();

  expect(function() {
    warning(false);
  }).not.toThrow();

  var error = console.error;

  var mock = console.error = jest.fn();

  warning(false, 'warning message');
  warning(true, 'warning message');

  expect(mock).not.toHaveBeenCalled();

  console.error = error;
};
