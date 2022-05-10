const connection = require("../db/connection");
const {
    productsQuery,
    productOptionsByIdQuery,
    productByIdQuery
} = require("../db/queries")

const getProducts = (callback) => {
    connection.query(
        productsQuery(),
        (error, result, fields) => {
            if (error) throw error;
            callback(result);
        }
    )
}

const getProductById = (id, callback) => {
    connection.query(
        productByIdQuery(id),
        (error, product, fields) => {
            if (error) throw error;
            connection.query(
                productOptionsByIdQuery(id),

                (error, options, fields) => {
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

const getProductOptionsById = (id, callback) => {
    connection.query(
        productOptionsByIdQuery(id),
        (error, result, fields) => {
            if (error) throw error;
            callback(result);
        }
    )
}


module.exports = {
    getProducts,
    getProductById
};
