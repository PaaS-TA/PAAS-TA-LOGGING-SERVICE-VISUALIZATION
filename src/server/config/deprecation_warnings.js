'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _transform_deprecations = require('./transform_deprecations');

exports['default'] = function (kbnServer, server) {
  (0, _transform_deprecations.transformDeprecations)(kbnServer.settings, function (message) {
    server.log(['warning', 'config', 'deprecation'], message);
  });
};

module.exports = exports['default'];
