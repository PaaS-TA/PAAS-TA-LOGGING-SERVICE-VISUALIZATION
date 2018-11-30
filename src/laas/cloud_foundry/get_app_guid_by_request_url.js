'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');

module.exports = (req, reply) => {
    let result = constants.RESULT_STATUS_FAIL;
    let resultSuccess = constants.RESULT_STATUS_SUCCESS;
    let reqPathArray = req.path.split('/');

    // BASE URL AND COMPARE REQUEST URL
    // CHECK LENGTH OF SPLIT REQUEST URL
    if (constants.BASE_URL === `/${reqPathArray[1]}/${reqPathArray[2]}` && reqPathArray.length > 3) {
        // CHECK LENGTH OF APP GUID OF REQUEST URL
        if (constants.APP_GUID_LENGTH <= reqPathArray[3].length) {
            // SET APP GUID IN SESSION
            sessions.setSession(req, reply, reqPathArray[3], constants.CF_APP_GUID);
            result = resultSuccess;
        }

        // EXCLUDE CALLBACK
        if (reqPathArray[3] === 'callback') {
            result = resultSuccess;
        }
    }

    return result;
};
