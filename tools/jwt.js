const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, ERROR_CODES } = require("../consts");
const { ErrorDTO } = require("../models/error-dto/error-dto");

const generateToken = (user, callback) => {
    jwt.sign(
        user.serialize(),
        PRIVATE_KEY,
        (err, token) => {
            if (err) {
                console.error(err);
                callback(new ErrorDTO(501, ERROR_CODES.UNKNOWN_ERROR));
                return;
            }

            callback(null, token);
        }
    );
}

const verifyToken = (token, callback) => {
    jwt.verify(token, PRIVATE_KEY, (err, payload) => {
        if (err) {
            console.error(err);
            callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
            return;
        }
        
        callback(null, payload);
    });
}

module.exports = {
    generateToken,
    verifyToken,
};
