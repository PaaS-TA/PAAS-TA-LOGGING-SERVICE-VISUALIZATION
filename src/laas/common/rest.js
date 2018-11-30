'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Promise = require('bluebird');
const request = Promise.promisify(require('request'), {
    multiArgs: true,
});

function parseResponse(response, body) {
    try {
        body = JSON.parse(body);
    } catch (e) {
        console.error(`THE SERVER DOES NOT RETURN A VALID JSON! => ERROR :: ${e.message}`);
    }

    return Promise.resolve(body);
}


module.exports = () => {
    function callApi(options) {
        return request(options).spread(parseResponse);
    }

    return {
        callApi
    };
};
