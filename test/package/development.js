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
  expect(calls[0][0])
    .toEqual(expect.stringMatching(/warning: warning message/i));

  console.error = error;
};
