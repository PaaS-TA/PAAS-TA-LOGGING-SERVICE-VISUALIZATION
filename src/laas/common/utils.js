'use strict';

const HEADER_ENCODING_FORMAT = 'base64';

module.exports = {
    // USE FORM URL ENCODE
    useFormURLEncode(value) {
        return encodeURIComponent(value).replace(/%20/g, '+');
    },


    // GET AUTHORIZATION HEADER
    getAuthorizationHeader(clientId, clientSecret) {
        return Buffer.from(`${this.useFormURLEncode(clientId)}:${this.useFormURLEncode(clientSecret)}`).toString(HEADER_ENCODING_FORMAT);
    },
};
