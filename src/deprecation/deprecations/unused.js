'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _utils = require('../../utils');

exports['default'] = function (oldKey) {
  return function (settings) {
    var log = arguments.length <= 1 || arguments[1] === undefined ? _lodash.noop : arguments[1];

    var value = (0, _lodash.get)(settings, oldKey);
    if ((0, _lodash.isUndefined)(value)) {
      return;
    }

    (0, _utils.unset)(settings, oldKey);
    log(oldKey + ' is deprecated and is no longer used');
  };
};

module.exports = exports['default'];
