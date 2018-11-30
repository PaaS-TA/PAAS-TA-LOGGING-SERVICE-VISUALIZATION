'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodash = require('lodash');

var constants = _crypto2['default'].constants;

var protocolMap = {
  TLSv1: _crypto2['default'].constants.SSL_OP_NO_TLSv1,
  'TLSv1.1': _crypto2['default'].constants.SSL_OP_NO_TLSv1_1,
  'TLSv1.2': _crypto2['default'].constants.SSL_OP_NO_TLSv1_2
};

exports['default'] = function (supportedProtocols) {
  if (!supportedProtocols || !supportedProtocols.length) {
    return null;
  }

  return (0, _lodash.chain)(protocolMap).omit(supportedProtocols).values().reduce(function (value, sum) {
    return value | sum;
  }, 0).value();
};

module.exports = exports['default'];
