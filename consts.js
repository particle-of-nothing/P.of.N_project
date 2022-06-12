const fs = require('fs');
const path = require('path');

const SEARCH_QUERY_PARAM_KEY = 's';

const HOST = 'localhost';
const PORT = '8000';
const PROTOCOL = 'http://';

const DEFAULT_SIGN_UP_ROLE = 1;

const ENCRIPTION_SALT_ROUNDS = 10;
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, 'secret.txt'), 'utf8');

const ERROR_CODES = {
    DATABASE_ERROR: 'DATABASE_ERROR',
    SUCH_USER_ALREADY_EXISTS_ERROR: 'SUCH_USER_ALREADY_EXISTS_ERROR',
    INCORRECT_LOGIN_OR_PASSWORD_ERROR: 'INCORRECT_LOGIN_OR_PASSWORD_ERROR',
    USER_NOT_FOUND_ERROR: 'USER_NOT_FOUND_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
}

module.exports = {
    SEARCH_QUERY_PARAM_KEY,
    HOST,
    PORT,
    PROTOCOL,
    ENCRIPTION_SALT_ROUNDS,
    ERROR_CODES,
    DEFAULT_SIGN_UP_ROLE,
    PRIVATE_KEY,
}
