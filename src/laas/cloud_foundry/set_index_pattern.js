'use strict';

const constants = require('../common/constants');
const rest = require('../common/rest')();

module.exports = (serverConfig, req, reply, data) => {

    // Apply index prefix property
    let reqIndexPattern = `${serverConfig.get(constants.ELASTICSEARCH_INDEX_PREFIX)}${data}-*`;

    let options = {
        method: 'PUT',
        url: `${serverConfig.get(constants.ELASTICSEARCH_URL)}/.kibana/index-pattern/${reqIndexPattern}`,
        headers:
            {
                'Content-Type': constants.CONTENT_TYPE_JSON
            },
        body:
            {
                title: reqIndexPattern,
                timeFieldName: constants.TIME_FIELD_NAME,
                fields: constants.DEFAULT_FIELDS
            },
        json: true
    };

    return rest.callApi(options);
};
