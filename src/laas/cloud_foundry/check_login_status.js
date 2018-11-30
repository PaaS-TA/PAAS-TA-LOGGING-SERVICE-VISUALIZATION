'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');

module.exports = (req, reply) => {
    let result = constants.RESULT_STATUS_FAIL;
    let reqPathArray = req.path.split('/');

    // CHECK CF ACCESS TOKEN IN SESSION
    // COMPARE CF APP GUID OF REQUEST URL AND CF APP GUID IN SESSION
    if (result !== sessions.getSession(req, reply, constants.CF_ACCESS_TOKEN) && reqPathArray[3] === sessions.getSession(req, reply, constants.CF_APP_GUID)) {
        result = constants.RESULT_STATUS_SUCCESS;
    }

    return result;
};
