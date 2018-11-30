'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _deprecation = require('../../deprecation');

var rename = _deprecation.Deprecations.rename;
var unused = _deprecation.Deprecations.unused;

var serverSslEnabled = function serverSslEnabled(settings, log) {
  var has = (0, _lodash.partial)(_lodash2['default'].has, settings);
  var set = (0, _lodash.partial)(_lodash2['default'].set, settings);

  if (!has('server.ssl.enabled') && has('server.ssl.certificate') && has('server.ssl.key')) {
    set('server.ssl.enabled', true);
    log('Enabling ssl by only specifying server.ssl.certificate and server.ssl.key is deprecated. Please set server.ssl.enabled to true');
  }
};

var deprecations = [
//server
rename('port', 'server.port'), rename('host', 'server.host'), rename('pid_file', 'pid.file'), rename('ssl_cert_file', 'server.ssl.certificate'), rename('server.ssl.cert', 'server.ssl.certificate'), rename('ssl_key_file', 'server.ssl.key'), unused('server.xsrf.token'), serverSslEnabled,

// logging
rename('log_file', 'logging.dest'),

// kibana
rename('kibana_index', 'kibana.index'), rename('default_app_id', 'kibana.defaultAppId'),

// es
rename('ca', 'elasticsearch.ssl.ca'), rename('elasticsearch_preserve_host', 'elasticsearch.preserveHost'), rename('elasticsearch_url', 'elasticsearch.url'), rename('kibana_elasticsearch_client_crt', 'elasticsearch.ssl.cert'), rename('kibana_elasticsearch_client_key', 'elasticsearch.ssl.key'), rename('kibana_elasticsearch_password', 'elasticsearch.password'), rename('kibana_elasticsearch_username', 'elasticsearch.username'), rename('ping_timeout', 'elasticsearch.pingTimeout'), rename('request_timeout', 'elasticsearch.requestTimeout'), rename('shard_timeout', 'elasticsearch.shardTimeout'), rename('startup_timeout', 'elasticsearch.startupTimeout'), rename('verify_ssl', 'elasticsearch.ssl.verify'),

// tilemap
rename('tilemap_url', 'tilemap.url'), rename('tilemap_min_zoom', 'tilemap.options.minZoom'), rename('tilemap_max_zoom', 'tilemap.options.maxZoom'), rename('tilemap_attribution', 'tilemap.options.attribution'), rename('tilemap_subdomains', 'tilemap.options.subdomains')];

var transformDeprecations = (0, _deprecation.createTransform)(deprecations);
exports.transformDeprecations = transformDeprecations;
