'use strict';

const constants = require('../common/constants');
const sessions = require('../common/sessions');
const Promise = require('bluebird');

const _getAccessToken = require('./get_access_token');
const _getAppGuidByRequestUrl = require('./get_app_guid_by_request_url');
const _getUserByAccessToken = require('./get_user_by_access_token');
const _getSpacesByUser = require('./get_spaces_by_user');
const _getAppsBySpaces = require('./get_apps_by_spaces');
const _setIndexPattern = require('./set_index_pattern');
const _checkLoginStatus = require('./check_login_status');

const BASE_URL = constants.BASE_URL;
const CF_ACCESS_TOKEN = constants.CF_ACCESS_TOKEN;
const CF_APP_GUID = constants.CF_APP_GUID;
const CF_SPACE_GUID = constants.CF_SPACE_GUID;
const USER_STATUS_CHECKED = constants.USER_STATUS_CHECKED;
const STATUS_CHECKED = constants.STATUS_CHECKED;
const STATUS_UNCHECKED = constants.STATUS_UNCHECKED;

const RESULT_SUCCESS = constants.RESULT_STATUS_SUCCESS;
const RESULT_FAIL = constants.RESULT_STATUS_FAIL;

module.exports = {
    // GET ACCESS TOKEN
    getAccessToken: function getCloudFoundryAccessToken(serverConfig, req, reply) {
        // GET CF ACCESS TOKEN :: uaa../oauth/token
        let getCloudFoundryAccessToken = function () {
            return new Promise(function (resolve, reject) {
                resolve(_getAccessToken(serverConfig, req, reply));
            })
        };

        getCloudFoundryAccessToken()
            .then(function (result) {
                // SET CF ACCESS TOKEN IN SESSION
                sessions.setSession(req, reply, result, CF_ACCESS_TOKEN);

                if (STATUS_CHECKED === sessions.getSession(req, reply, USER_STATUS_CHECKED)) {
                    // SET USER STATUS IN SESSION
                    sessions.setSession(req, reply, STATUS_UNCHECKED, USER_STATUS_CHECKED);
                    reply['continue']();

                } else {
                    // SET USER STATUS IN SESSION
                    sessions.setSession(req, reply, STATUS_CHECKED, USER_STATUS_CHECKED);
                    // GET APP GUID FROM SESSION
                    reply.redirect(`${BASE_URL}/${sessions.getSession(req, reply, CF_APP_GUID)}`);
                }
            });
    },


    // VERIFY AUTHORITY
    verifyAuthority: (serverConfig, req, reply) => {
        let finalResult = RESULT_FAIL;

        // GET APP GUID BY REQUEST URL
        let getAppGuidByRequestUrl = function () {
            return new Promise(function (resolve, reject) {
                resolve(_getAppGuidByRequestUrl(req, reply));
            })
        };

        // GET CF USER BY ACCESS TOKEN :: uaa../check_token
        let getCfUserByAccessToken = function (data) {
            return new Promise(function (resolve, reject) {
                resolve(_getUserByAccessToken(serverConfig, req, reply, data));
            })
        };

        // GET CF SPACES BY USER :: api../v2/users/:guid/spaces
        let getCfSpacesByUser = function (data) {
            return new Promise(function (resolve, reject) {
                resolve(_getSpacesByUser(serverConfig, req, reply, data));
            })
        };

        // GET CF APPS BY SPACES :: api../v2/users/:guid/spaces
        let getCfAppsBySpaces = function (data) {
            return new Promise(function (resolve, reject) {
                resolve(_getAppsBySpaces(serverConfig, req, reply, data));
            })
        };

        // SET INDEX PATTERN :: es../.kibana/index-pattern/:index-pattern
        let setIndexPattern = function (data) {
            return new Promise(function (resolve, reject) {
                resolve(_setIndexPattern(serverConfig, req, reply, data));
            })
        };

        // SET RESULT
        let setResult = function (result) {
            if (RESULT_FAIL !== result) {
                let spaces;
                let appGuid;

                // GET APP GUID FROM SESSION
                let sessionAppGuid = sessions.getSession(req, reply, CF_APP_GUID);

                // LOOP
                result.forEach(function (e1) {
                    spaces = e1.resources;
                    // LOOP
                    spaces.forEach(function (e2) {
                        appGuid = e2.metadata.guid;

                        // COMPARE CF APP GUID OF RESULT AND CF APP GUID IN SESSION
                        if (appGuid === sessionAppGuid) {
                            let spaceGuid = e2.entity.space_guid;

                            // GET SPACE GUID FROM SESSION
                            let sessionSpaceGuid = sessions.getSession(req, reply, CF_SPACE_GUID);

                            // CHECK SPACE GUID IN SESSION
                            // COMPARE SPACE GUID OF RESULT AND SPACE GUID IN SESSION
                            if (constants.RESULT_STATUS_FAIL === sessionSpaceGuid || spaceGuid !== sessionSpaceGuid) {
                                // CREATE INDEX PATTERN
                                setIndexPattern(spaceGuid);
                            }

                            // SET SPACE GUID IN SESSION
                            sessions.setSession(req, reply, spaceGuid, CF_SPACE_GUID);
                            finalResult = RESULT_SUCCESS;
                        }
                    });
                });

                // RESPONSE
                if (RESULT_SUCCESS === finalResult) {
                    reply['continue']();
                } else {
                    reply.view('error_403');
                }
            } else {
                reply.view('error_500');
            }
        };


        // BLUEBIRD PROMISE
        getAppGuidByRequestUrl()
            .then(function (result) {
                return getCfUserByAccessToken(result);
            })
            .then(function (result) {
                return getCfSpacesByUser(result);
            })
            .then(function (result) {
                let reqUrl = `${serverConfig.get(constants.CF_UAA_URL)}/oauth/authorize?response_type=code&client_id=${serverConfig.get(constants.CF_CLIENT_ID)}&redirect_uri=${serverConfig.get(constants.CF_UAA_CALLBACK_URL)}&scope=${serverConfig.get(constants.CF_UAA_SCOPE)}`;

                // ERROR
                if (RESULT_FAIL === result) {
                    // GET APP GUID FROM SESSION
                    let sessionAppGuid = sessions.getSession(req, reply, CF_APP_GUID);

                    // CHECK CF ACCESS TOKEN IN SESSION
                    // CHECK CF APP GUID IN SESSION
                    if (RESULT_FAIL !== sessions.getSession(req, reply, CF_ACCESS_TOKEN) && RESULT_FAIL !== sessionAppGuid) {
                        reply['continue']();
                    } else {
                        reply.view('error_500');
                    }

                    // REDIRECT LOGIN PAGE
                } else if (constants.RESULT_STATUS_USER_VALID_ERROR === result) {
                    reqUrl += `&state=${req.path.split('/')[3]}`;
                    reply.redirect(reqUrl);

                    // SUCCESS
                } else {
                    let spaces = result.resources;
                    let items = [];

                    // LOOP
                    spaces.forEach(function (e) {
                        items.push(e);
                    });

                    // SET RESULT
                    Promise.all(items.map(getCfAppsBySpaces)).then(data => setResult(data));
                }
            });
    },


    // CHECK LOGIN STATUS
    checkLoginStatus: (serverConfig, req, reply) => {
        let checkLoginStatus = function () {
            return new Promise(function (resolve, reject) {
                resolve(_checkLoginStatus(req, reply));
            })
        };

        checkLoginStatus()
            .then(function (result) {
                if (RESULT_FAIL === result) {
                    // RESET SESSION
                    req.yar.reset();
                }

                reply.redirect(`${serverConfig.get('server.basePath') + BASE_URL}`);
            });
    }
};
