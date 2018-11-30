'use strict';

const constants = require('./constants');

module.exports = {
    // GET SESSION
    getSession: function getHapiYarSession(req, reply, options) {
        let result = '';
        let resultFail = constants.RESULT_STATUS_FAIL;

        try {
            result = req.yar.get(options).key;
        } catch (e) {
            result = resultFail;
            console.error(`ERROR :: GET SESSION :: ${options} => ERROR :: ${e.message}`);
        } finally {
            result = (result === undefined || result === '')
                ? resultFail
                : result;
        }

        return result;
    },


    // SET SESSION
    setSession: function setHapiYarSession(req, reply, values, options) {
        let result = constants.RESULT_STATUS_SUCCESS;

        try {
            req.yar.set(options,
                {
                    key: (constants.CF_ACCESS_TOKEN === options)
                        ? values.access_token
                        : values
                });
        } catch (e) {
            result = constants.RESULT_STATUS_FAIL;
            console.error(`ERROR :: SET SESSION :: ${options} => ERROR :: ${e.message}`);
        }

        return result;
    }
};
