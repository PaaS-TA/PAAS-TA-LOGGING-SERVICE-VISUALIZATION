'use strict';

// CONFIG STRING FROM YML
const CF_UAA_URL = 'laas.cf_uaa_url';
const CF_API_URL = 'laas.cf_api_url';
const CF_UAA_CALLBACK_URL = 'laas.cf_uaa_callback_url';
const CF_UAA_SCOPE = 'laas.cf_uaa_scope';
const CF_CLIENT_ID = 'laas.cf_client_id';
const CF_CLIENT_SECRET = 'laas.cf_client_secret';
const ELASTICSEARCH_URL = 'elasticsearch.url';
const ELASTICSEARCH_INDEX_PREFIX = 'laas.elasticsearch_index_prefix';

// CONSTANTS
const BASE_URL = '/app/laas';
const RESULT_STATUS_SUCCESS = 'SUCCESS';
const RESULT_STATUS_FAIL = 'FAIL';
const RESULT_STATUS_USER_VALID_ERROR = 'USER_VALID_ERROR';
const STATUS_CHECKED = 'CHECKED';
const STATUS_UNCHECKED = 'UNCHECKED';
const CF_ACCESS_TOKEN = 'CF_ACCESS_TOKEN';
const CF_APP_GUID = 'CF_APP_GUID';
const CF_SPACE_GUID = 'CF_SPACE_GUID';
const USER_STATUS_CHECKED = 'USER_STATUS_CHECKED';
const CONTENT_TYPE_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_JSON = 'application/json';
const APP_GUID_LENGTH = 35;
const TIME_FIELD_NAME = '@timestamp';
const DEFAULT_FIELDS = '[' +
    '{"name":"@paasta.app_id","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@source.type","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@type","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@paasta.app_name","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@source.job_index","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"geoip.location","type":"geo_point","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@version","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":false,"aggregatable":false},' +
    '{"name":"level","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@paasta.org_name","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@paasta.space_name","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"message_type","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@source.component","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@paasta.space_id","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"tags","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@message","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@timestamp","type":"date","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@source.job","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"@raw","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":true,"doc_values":false,"searchable":false,"aggregatable":false},' +
    '{"name":"@paasta.app_instance","type":"number","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"_source","type":"_source","count":0,"scripted":false,"indexed":false,"analyzed":false,"doc_values":false,"searchable":false,"aggregatable":false},' +
    '{"name":"@paasta.org_id","type":"string","count":0,"scripted":false,"indexed":true,"analyzed":false,"doc_values":true,"searchable":true,"aggregatable":true},' +
    '{"name":"_id","type":"string","count":0,"scripted":false,"indexed":false,"analyzed":false,"doc_values":false,"searchable":false,"aggregatable":false},' +
    '{"name":"_type","type":"string","count":0,"scripted":false,"indexed":false,"analyzed":false,"doc_values":false,"searchable":true,"aggregatable":true},' +
    '{"name":"_index","type":"string","count":0,"scripted":false,"indexed":false,"analyzed":false,"doc_values":false,"searchable":false,"aggregatable":false},' +
    '{"name":"_score","type":"number","count":0,"scripted":false,"indexed":false,"analyzed":false,"doc_values":false,"searchable":false,"aggregatable":false}' +
    ']';

module.exports = {
    CF_UAA_URL,
    CF_API_URL,
    CF_UAA_CALLBACK_URL,
    CF_UAA_SCOPE,
    CF_CLIENT_ID,
    CF_CLIENT_SECRET,
    ELASTICSEARCH_URL,
    ELASTICSEARCH_INDEX_PREFIX,
    BASE_URL,
    RESULT_STATUS_SUCCESS,
    RESULT_STATUS_FAIL,
    RESULT_STATUS_USER_VALID_ERROR,
    STATUS_CHECKED,
    STATUS_UNCHECKED,
    CF_ACCESS_TOKEN,
    CF_APP_GUID,
    CF_SPACE_GUID,
    USER_STATUS_CHECKED,
    CONTENT_TYPE_FORM_URLENCODED,
    CONTENT_TYPE_JSON,
    APP_GUID_LENGTH,
    TIME_FIELD_NAME,
    DEFAULT_FIELDS
};
