'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');
const rest = require('../common/rest')();

module.exports = (serverConfig, req, reply, data) => {
    let resultFail = constants.RESULT_STATUS_FAIL;

    if (resultFail === data || constants.RESULT_STATUS_USER_VALID_ERROR === data) {
        return data;
    }

    // GET CF ACCESS TOKEN FROM SESSION
    let cfAccessToken = sessions.getSession(req, reply, constants.CF_ACCESS_TOKEN);

    if (resultFail === cfAccessToken) {
        return resultFail;
    }

    let userGuid = data.user_id;

    let options = {
        method: 'GET',
        url: `${serverConfig.get(constants.CF_API_URL)}/v2/users/${userGuid}/spaces`,
        headers:
            {
                'Authorization': `Bearer ${cfAccessToken}`
            }
    };

    return rest.callApi(options);
};
