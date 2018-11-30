'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('../utils');

var _lodash = require('lodash');

exports['default'] = function (deprecations) {
  return function (settings) {
    var log = arguments.length <= 1 || arguments[1] === undefined ? _lodash.noop : arguments[1];

    var result = (0, _utils.deepCloneWithBuffers)(settings);

    (0, _lodash.forEach)(deprecations, function (deprecation) {
      deprecation(result, log);
    });

    return result;
  };
};

module.exports = exports['default'];
