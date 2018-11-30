'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');
const utils = require('../common/utils');
const rest = require('../common/rest')();

module.exports = (serverConfig, req, reply, data) => {
    let resultFail = constants.RESULT_STATUS_FAIL;

    if (resultFail === data) {
        return data;
    }

    // GET CF ACCESS TOKEN FROM SESSION
    let cfAccessToken = sessions.getSession(req, reply, constants.CF_ACCESS_TOKEN);

    if (resultFail === cfAccessToken) {
        return constants.RESULT_STATUS_USER_VALID_ERROR;
    }

    let options = {
        method: 'POST',
        url: `${serverConfig.get(constants.CF_UAA_URL)}/check_token`,
        headers:
            {
                'Content-Type': constants.CONTENT_TYPE_FORM_URLENCODED,
                'Authorization': `Basic ${utils.getAuthorizationHeader(serverConfig.get(constants.CF_CLIENT_ID), serverConfig.get(constants.CF_CLIENT_SECRET))}`
            },
        form:
            {
                token: cfAccessToken
            }
    };

    return rest.callApi(options);
};
