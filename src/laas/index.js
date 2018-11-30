'use strict';

const commonConstants = require('./common/constants');
const commonSessions = require('./common/sessions');
const cloudFoundry = require('./cloud_foundry/index');

module.exports = {
    // GET Logging Service BASE URL
    getBaseUrl: () => {
        return commonConstants.BASE_URL;
    },


    // GET HAPI YAR SESSION
    getSession(req, reply, options) {
        return commonSessions.getSession(req, reply, options);
    },


    // GET CLOUD FOUNDRY ACCESS TOKEN
    getAccessToken: function getCloudFoundryAccessToken(serverConfig, req, reply) {
        return cloudFoundry.getAccessToken(serverConfig, req, reply);
    },


    // VERIFY CLOUD FOUNDRY AUTHORITY
    verifyAuthority: (serverConfig, req, reply) => {
        return cloudFoundry.verifyAuthority(serverConfig, req, reply);
    },


    // CHECK LOGIN STATUS
    checkLoginStatus: (serverConfig, req, reply) => {
        return cloudFoundry.checkLoginStatus(serverConfig, req, reply);
    }
};
