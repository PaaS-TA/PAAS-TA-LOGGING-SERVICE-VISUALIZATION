'use strict';

const constants = require('./constants');

module.exports = {
    // GET SESSION
    getSession: function getHapiYarSession(req, reply, options) {
        let result = constants.RESULT_STATUS_FAIL;
        let reqOptions = req.yar.get(options);

        if (reqOptions !== undefined && reqOptions !== '') {
            result = reqOptions.key;
        }

        return result;
    },


    // SET SESSION
    setSession: function setHapiYarSession(req, reply, values, options) {
        req.yar.set(options,
            {
                key: (constants.CF_ACCESS_TOKEN === options)
                    ? values.access_token
                    : values
            });
    }
};
