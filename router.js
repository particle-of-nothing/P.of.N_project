const { SEARCH_QUERY_PARAM_KEY, PROTOCOL, HOST, PORT, ERROR_CODES } = require("./consts");
const { signUp, auth } = require("./repositories/auth.repository");
const { getCategories, getCategoriesByType } = require("./repositories/categories.repository");
const { createPacket, getPacketById, getPackets, renamePacket, addProductToPacket, deleteProductFormPacket } = require("./repositories/packet.repository");
const { getProducts, getProductById, getProductsByCategoryId } = require("./repositories/products.repository");
const { search } = require("./repositories/search.repository");
const { verifyToken, generateToken } = require("./tools/jwt");
const { readBody } = require("./tools/read-body");

const setGeneralHeaders = (response) => {
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Expose-Headers", "authorization");
};

const authRequest = (request, response, callback) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        response.writeHead(401);
        response.end({ code: ERROR_CODES.NO_CREDENTIALS_PROVIDED_ERROR });
        return;
    }

    const token = authHeader.split(' ')[1];

    verifyToken(token, (err, payload) => {
        if (err) {
            response.writeHead(err.status);
            response.end(err.serialize());
            return;
        }

        generateToken(payload.id, (err, newToken) => {
            if (err) {
                response.writeHead(err.status);
                response.end(err.serialize());
                return;
            }

            response.writeHead(200, { 'authorization': `Bearer ${newToken}` });

            callback(payload);

        });
    });
}

const routes = [
    (request, response) => {
        if (request.method === 'OPTIONS') {
            response.end();
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/search\?.*/i);
        const url = new URL(`${PROTOCOL}${HOST}:${PORT}/${request.url}`);
        const queryParams = new URLSearchParams(url.search);
        const searchPattern = queryParams.get(SEARCH_QUERY_PARAM_KEY);
        if (match != null && searchPattern && request.method === 'GET') {
            search(searchPattern, result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/products' && request.method === 'GET') {
            getProducts(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/categories' && request.method === 'GET') {
            getCategories(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/products\/(\d+)$/i);
        if (match != null && match[1] && request.method === 'GET') {
            getProductById(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        // Продукты по id категории
        const match = request.url.match(/^\/products\?category=(\d+)$/i);
        if (match != null && match[1] && request.method === 'GET') {
            getProductsByCategoryId(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/category\?type=(\d+)$/i);
        if (match != null && match[1] && request.method === 'GET') {
            getCategoriesByType(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === "/sign-up" && request.method === "POST") {
            readBody(request, signUpData => {
                const { login, password } = JSON.parse(signUpData);

                signUp(login, password, (err, result) => {
                    if (err) {
                        response.writeHead(err.status);
                        response.end(err.serialize());
                        return;
                    }

                    response.writeHead(200, { 'authorization': `Bearer ${result.token}` });
                    response.end(result.user.serialize());
                });
            });

            return true;
        }
    },
    (request, response) => {
        if (request.url === "/auth" && request.method === "POST") {
            readBody(request, authData => {
                const { login, password } = JSON.parse(authData);

                auth(login, password, (err, result) => {
                    if (err) {
                        response.writeHead(err.status);
                        response.end(err.serialize());
                        return;
                    }

                    response.writeHead(200, { 'authorization': `Bearer ${result.token}` });
                    response.end(result.user.serialize());
                });
            });

            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/packets\/(\d+)$/i);
        if (match != null && match[1] && request.method === 'GET') {
            getPacketById(match[1], (err, packet) => {
                if (err) {
                    response.writeHead(err.status);
                    response.end(err.serialize());
                    return;
                }

                response.end(packet.serialize());
            });
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/packets' && request.method === 'GET') {
            getPackets((err, packets) => {
                if (err) {
                    response.writeHead(err.status);
                    response.end(err.serialize());
                    return;
                }

                response.end(JSON.stringify(packets))
            });
            return true;
        }
    },
    (request, response) => {
        if (request.url === "/packets" && request.method === "POST") {

            authRequest(request, response, (tokenPayload) => {
                createPacket(tokenPayload.id, (err, packet) => {
                    if (err) {
                        response.writeHead(err.status);
                        response.end(err.serialize());
                        return;
                    }

                    response.end(packet.serialize());
                });
            });

            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/packets\/(\d+)$/i);
        if (match != null && match[1] && request.method === 'PATCH') {
            authRequest(request, response, () => {
                readBody(request, changes => {
                    const parsedChanges = JSON.parse(changes);
                    renamePacket(match[1], parsedChanges.name, (err, packet) => {
                        if (err) {
                            response.writeHead(err.status);
                            response.end(err.serialize());
                            return;
                        }

                        response.end(packet.serialize());
                    });
                })
            });

            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/packets\/(\d+)\/products$/i);
        if (match != null && match[1] && request.method === 'PATCH') {
            authRequest(request, response, () => {
                readBody(request, productIdObject => {
                    const parsedProductIdObject = JSON.parse(productIdObject);
                    addProductToPacket(match[1], parsedProductIdObject.id, (err, packet) => {
                        if (err) {
                            response.writeHead(err.status);
                            response.end(err.serialize());
                            return;
                        }

                        response.end(packet.serialize());
                    });
                })
            });

            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/packets\/(\d+)\/products$/i);
        if (match != null && match[1] && request.method === 'DELETE') {
            authRequest(request, response, () => {
                readBody(request, productIdObject => {
                    const parsedProductIdObject = JSON.parse(productIdObject);
                    deleteProductFormPacket(match[1], parsedProductIdObject.id, (err, packet) => {
                        if (err) {
                            response.writeHead(err.status);
                            response.end(err.serialize());
                            return;
                        }

                        response.end(packet.serialize());
                    });
                })
            });

            return true;
        }
    },
];

const router = (request, response) => {
    const hasMatch = routes.some((route) => {
        setGeneralHeaders(response);
        return route(request, response);
    })
    if (!hasMatch) {
        response.end('Default response');
    }
};

module.exports = router;
