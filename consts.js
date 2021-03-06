const fs = require('fs');
const path = require('path');

const SEARCH_QUERY_PARAM_KEY = 's';

const HOST = 'localhost';
const PORT = '8000';
const PROTOCOL = 'http://';

const DEFAULT_SIGN_UP_ROLE = 1;

const ENCRIPTION_SALT = fs.readFileSync(path.resolve(__dirname, 'salt.txt'), 'utf8');;
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, 'secret.txt'), 'utf8');

const ERROR_CODES = {
    DATABASE_ERROR: 'DATABASE_ERROR',
    SUCH_USER_ALREADY_EXISTS_ERROR: 'SUCH_USER_ALREADY_EXISTS_ERROR',
    INCORRECT_LOGIN_OR_PASSWORD_ERROR: 'INCORRECT_LOGIN_OR_PASSWORD_ERROR',
    USER_NOT_FOUND_ERROR: 'USER_NOT_FOUND_ERROR',
    CAN_NOT_LOAD_PRODUCTS_OF_PACKET_ERROR: 'CAN_NOT_LOAD_PRODUCTS_OF_PACKET_ERROR',
    CAN_NOT_CREATE_PACKET_ERROR: 'CAN_NOT_CREATE_PACKET_ERROR',
    CAN_NOT_UPDATE_PACKET_ERROR: 'CAN_NOT_UPDATE_PACKET_ERROR',
    CAN_NOT_FIND_SUCH_PRODUCT_IN_PACKET_ERROR: 'CAN_NOT_FIND_SUCH_PRODUCT_IN_PACKET_ERROR',
    NO_CREDENTIALS_PROVIDED_ERROR: 'NO_CREDENTIALS_PROVIDED_ERROR',
    NO_SUCH_PACKET_EXISTS_ERROR: 'NO_SUCH_PACKET_EXISTS_ERROR',
    INVALID_TOKEN_ERROR: 'INVALID_TOKEN_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
}

module.exports = {
    SEARCH_QUERY_PARAM_KEY,
    HOST,
    PORT,
    PROTOCOL,
    ENCRIPTION_SALT,
    ERROR_CODES,
    DEFAULT_SIGN_UP_ROLE,
    PRIVATE_KEY,
}
