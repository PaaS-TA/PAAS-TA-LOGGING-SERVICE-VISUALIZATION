'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Promise = require('bluebird');
const request = Promise.promisify(require('request'), {
    multiArgs: true,
});

function parseResponse(response, body) {
    if (typeof body === 'string') {
        body = JSON.parse(body);
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
