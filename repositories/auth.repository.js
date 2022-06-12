const { ERROR_CODES, DEFAULT_SIGN_UP_ROLE } = require("../consts");
const connection = require("../db/connection");
const { createUserQuery, getUserByLoginQuery, getUserByIdQuery } = require("../db/queries");
const { ErrorDTO } = require("../models/error-dto/error-dto");
const { User } = require("../models/user/user");
const { generateToken } = require("../tools/jwt");
const { encriptPassword, comparePasswords } = require("../tools/password-encripting");

const getUserByLogin = (login, callback) => {
    connection.query(
        getUserByLoginQuery(login),
        (error, users) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.DATABASE_ERROR));
                return;
            };

            if (!users.length) {
                callback(new ErrorDTO(404, ERROR_CODES.USER_NOT_FOUND_ERROR));
                return;
            }

            callback(
                null,
                new User(
                    users[0].id_user,
                    users[0].login,
                    users[0].password,
                    users[0].role
                )
            );
        }
    );
}

const getUserById = (id, callback) => {
    connection.query(
        getUserByIdQuery(id),
        (error, users) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.DATABASE_ERROR));
                return;
            };

            if (!users.length) {
                callback(new ErrorDTO(404, ERROR_CODES.USER_NOT_FOUND_ERROR));
                return;
            }

            callback(
                null,
                new User(
                    users[0].id_user,
                    users[0].login,
                    users[0].password,
                    users[0].role,
                )
            );
        }
    );
}

const createUser = (signUpData, callback) => {
    const plainPassword = signUpData.password;

    getUserByLogin(signUpData.login, (err) => {
        if (err) {
            encriptPassword(plainPassword, (err, hash) => {
                if (err) {
                    callback(err);
                    return;
                }

                connection.query(
                    createUserQuery(
                        signUpData.login,
                        hash,
                        DEFAULT_SIGN_UP_ROLE,
                    ),
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
                            return;
                        };

                        getUserById(result.insertId, (err, user) => {
                            if (err) {
                                callback(err);
                                return;
                            }

                            callback(null, user);
                        });

                    }
                );
            });
            return;
        }

        callback(new ErrorDTO(401, ERROR_CODES.SUCH_USER_ALREADY_EXISTS_ERROR, "Пользователь с таким логином уже существует"));

    });

}

const signUp = (login, password, callback) => {
    createUser({ login, password }, (err, user) => {
        if (err) {
            callback(err);
            return;
        }

        generateToken(
            user.id,
            (err, token) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, { token, user });
            },
        );
    });
}

const auth = (login, password, callback) => {
    getUserByLogin(login, (err, user) => {
        if (err) {
            callback(new ErrorDTO(501, ERROR_CODES.INCORRECT_LOGIN_OR_PASSWORD_ERROR));
            return;
        }

        comparePasswords(password, user.password, (err, result) => {
            if (err) {
                callback(err);
                return;
            }

            if (!result) {
                callback(new ErrorDTO(501, ERROR_CODES.INCORRECT_LOGIN_OR_PASSWORD_ERROR));
                return;
            }

            generateToken(
                user.id,
                (err, token) => {
                    if (err) {
                        callback(err);
                        return;
                    }

                    callback(null, { token, user });
                },
            );
        });
    })
}

module.exports = {
    createUser,
    getUserByLogin,
    getUserById,
    signUp,
    auth,
}
