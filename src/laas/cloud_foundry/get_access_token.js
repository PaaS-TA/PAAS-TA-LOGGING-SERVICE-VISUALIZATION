'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');
const rest = require('../common/rest')();

module.exports = function getCloudFoundryAccessToken(serverConfig, req, reply) {
    let reqQuery = req.query;

    // SET APP GUID IN SESSION
    sessions.setSession(req, reply, reqQuery.state, constants.CF_APP_GUID);

    let options = {
        method: 'POST',
        url: `${serverConfig.get(constants.CF_UAA_URL)}/oauth/token`,
        headers:
            {
                'Content-Type': constants.CONTENT_TYPE_FORM_URLENCODED
            },
        form:
            {
                grant_type: 'authorization_code',
                client_id: `${serverConfig.get(constants.CF_CLIENT_ID)}`,
                client_secret: `${serverConfig.get(constants.CF_CLIENT_SECRET)}`,
                code: reqQuery.code,
                redirect_uri: `${serverConfig.get(constants.CF_UAA_CALLBACK_URL)}`,
            }
    };

    return rest.callApi(options);
};
