'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');
const rest = require('../common/rest')();

module.exports = (serverConfig, req, reply, data) => {
    let resultFail = constants.RESULT_STATUS_FAIL;

    if (resultFail === data) {
        return resultFail;
    }

    // GET CF ACCESS TOKEN FROM SESSION
    let cfAccessToken = sessions.getSession(req, reply, constants.CF_ACCESS_TOKEN);

    if (resultFail === cfAccessToken) {
        return resultFail;
    }

    let spaceGuid = data.metadata.guid;

    let options = {
        method: 'GET',
        url: `${serverConfig.get(constants.CF_API_URL)}/v2/spaces/${spaceGuid}/apps`,
        headers:
            {
                'Authorization': `Bearer ${cfAccessToken}`
            }
    };

    return rest.callApi(options);
};
