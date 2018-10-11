module.exports = function() {
  var warning = require('../../');

  expect(function() {
    warning(true);
  }).toThrow(/requires a warning/i);

  expect(function() {
    warning(false);
  }).toThrow(/requires a warning/i);

  var error = console.error;

  var mockFn = console.error = jest.fn();
  var calls = console.error.mock.calls;

  // should call console.error
  warning(false, 'warning message');

  // should not call console.error
  warning(true, 'warning message');

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith('Warning: warning message');

  // should format message with arguments
  warning(false, 'warning %s with one argument', 'message');
  warning(false, 'warning %s with %s arguments', 'message', 'two');

  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(mockFn).toHaveBeenCalledWith('Warning: warning message with one argument');
  expect(mockFn).toHaveBeenCalledWith('Warning: warning message with two arguments');

  console.error = error;
};
