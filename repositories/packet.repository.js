const { ERROR_CODES } = require("../consts");
const connection = require("../db/connection")
const { getPacketByIdQuery, createPacketQuery, getPacketsQuery, renamePacketQuery, findProductInPacketQuery, updateProductQuantityInPacketQuery, addProductToPacketQuery, deleteProductFromPacketQuery, getPacketsByUserIdQuery } = require("../db/queries");
const { ErrorDTO } = require("../models/error-dto/error-dto");
const { Packet } = require("../models/packet/packet");
const { getProductsByPacketId } = require("./products.repository");

const getPacketById = (id, callback) => {
    connection.query(
        getPacketByIdQuery(id),
        (error, packets) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR))
                return;
            }

            if (!packets.length) {
                console.error(error);
                callback(new ErrorDTO(404, ERROR_CODES.NO_SUCH_PACKET_EXISTS_ERROR))
                return;
            }

            getProductsByPacketId(id, (err, products) => {
                if (err) {
                    callback(err)
                    return;
                }

                callback(
                    null,
                    new Packet(
                        packets[0].id_packet,
                        packets[0].name,
                        packets[0].id_user,
                        products
                    ),
                );
            })

        }
    )
}

const getPackets = (callback) => {
    connection.query(
        getPacketsQuery(),
        (error, packets) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
                return;
            }

            callback(null, packets);
        }
    );
}

const getPacketsByUserId = (userId, callback) => {
    connection.query(
        getPacketsByUserIdQuery(userId),
        (error, packets) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
                return;
            }

            callback(null, packets);
        }
    );
}

const createPacket = (userId, callback) => {
    connection.query(
        createPacketQuery(userId),
        (error, result) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_CREATE_PACKET_ERROR));
                return;
            }

            getPacketById(result.insertId, (err, packet) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, packet);
            })
        }
    );
}

const renamePacket = (id, newName, callback) => {
    connection.query(
        renamePacketQuery(id, newName),
        (error) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_UPDATE_PACKET_ERROR));
                return;
            }

            getPacketById(id, (err, packet) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, packet);
            });
        }
    )
}

const addProductToPacket = (packetId, productId, callback) => {
    connection.query(
        findProductInPacketQuery(packetId, productId),
        (error, packetsProducts) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
                return;
            }

            if (packetsProducts.length) {
                connection.query(
                    updateProductQuantityInPacketQuery(
                        packetId,
                        productId,
                        packetsProducts[0].quantity + 1
                    ),
                    (error) => {
                        if (error) {
                            console.error(error);
                            callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_UPDATE_PACKET_ERROR));
                            return;
                        }

                        getPacketById(packetId, (err, packet) => {
                            if (err) {
                                callback(err);
                                return;
                            }
            
                            callback(null, packet);
                        })
                    }
                );
            } else {
                connection.query(
                    addProductToPacketQuery(packetId, productId),
                    (error) => {
                        if (error) {
                            console.error(error);
                            callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_UPDATE_PACKET_ERROR));
                            return;
                        }

                        getPacketById(packetId, (err, packet) => {
                            if (err) {
                                callback(err);
                                return;
                            }
            
                            callback(null, packet);
                        })
                    }
                )
            }
        }
    )
}

const deleteProductFormPacket = (packetId, productId, callback) => {
    connection.query(
        findProductInPacketQuery(packetId, productId),
        (error, packetsProducts) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.UNKNOWN_ERROR));
                return;
            }

            if (packetsProducts.length) {

                if (packetsProducts[0].quantity > 1) {
                    connection.query(
                        updateProductQuantityInPacketQuery(
                            packetId,
                            productId,
                            packetsProducts[0].quantity - 1
                        ),
                        (error) => {
                            if (error) {
                                console.error(error);
                                callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_UPDATE_PACKET_ERROR));
                                return;
                            }
    
                            getPacketById(packetId, (err, packet) => {
                                if (err) {
                                    callback(err);
                                    return;
                                }
                
                                callback(null, packet);
                            })
                        }
                    );
                } else {
                    connection.query(
                        deleteProductFromPacketQuery(packetId, productId),
                        (error) => {
                            if (error) {
                                console.error(error);
                                callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_UPDATE_PACKET_ERROR));
                                return;
                            }
    
                            getPacketById(packetId, (err, packet) => {
                                if (err) {
                                    callback(err);
                                    return;
                                }
                
                                callback(null, packet);
                            })
                        }
                    )
                }
            } else {
                console.error("Не нашёлся такой продукт в сборке");
                callback(new ErrorDTO(404, ERROR_CODES.CAN_NOT_FIND_SUCH_PRODUCT_IN_PACKET_ERROR));
            }
        }
    )
}

module.exports = {
    getPacketById,
    createPacket,
    getPackets,
    getPacketsByUserId,
    renamePacket,
    addProductToPacket,
    deleteProductFormPacket,
}
