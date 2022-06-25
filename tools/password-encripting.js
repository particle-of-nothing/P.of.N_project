const bcrypt = require('bcrypt');

const { ENCRIPTION_SALT, ERROR_CODES } = require("../consts");
const { ErrorDTO } = require("../models/error-dto/error-dto");

const encriptPassword = (password, callback) => {
    bcrypt.hash(password, ENCRIPTION_SALT, (err, hash) => {
        if (err) {
            console.error(err);
            callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
            return;
        }
        callback(null, hash);
    });
}

const comparePasswords = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            console.error(err);
            callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
            return;
        }
        callback(null, result);
    });
}

module.exports = {
    encriptPassword,
    comparePasswords,
};
