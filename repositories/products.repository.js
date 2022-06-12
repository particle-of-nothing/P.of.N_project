const { ERROR_CODES } = require("../consts");
const connection = require("../db/connection");
const {
    productsQuery,
    productOptionsByIdQuery,
    productByIdQuery,
    productsByCategoryIdQuery,
    getProductsByPacketIdQuery
} = require("../db/queries");
const { ErrorDTO } = require("../models/error-dto/error-dto");

const getProducts = (callback) => {
    connection.query(
        productsQuery(),
        (error, result) => {
            if (error) throw error;
            callback(result);
        }
    )
}

const getProductById = (id, callback) => {
    connection.query(
        productByIdQuery(id),
        (error, product) => {
            if (error) throw error;
            connection.query(
                productOptionsByIdQuery(id),

                (error, options) => {
                    if (error) throw error;

                    const enrichedProduct = {
                        ...product[0],
                        options
                    };
                    callback(enrichedProduct);
                }
            )
        }
    )
}

const getProductsByCategoryId = (id, callback) => {
    connection.query(
        productsByCategoryIdQuery(id),
        (error, result) => {
            if (error) throw error;
            callback(result);
        }
    )
}

const getProductsByPacketId = (id, callback) => {
    connection.query(
        getProductsByPacketIdQuery(id),
        (error, products) => {
            if (error) {
                console.error(error);
                callback(new ErrorDTO(500, ERROR_CODES.CAN_NOT_LOAD_PRODUCTS_OF_PACKET_ERROR))
                return;
            };

            callback(null, products);
        }
    )
}

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategoryId,
    getProductsByPacketId,
};
