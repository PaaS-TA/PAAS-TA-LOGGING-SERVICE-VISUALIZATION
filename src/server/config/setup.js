'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _transform_deprecations = require('./transform_deprecations');

module.exports = function (kbnServer) {
  var settings = (0, _transform_deprecations.transformDeprecations)(kbnServer.settings);
  kbnServer.config = _config2['default'].withDefaultSchema(settings);
};
