const connection = require("../db/connection");
const {
    productsQuery,
    productOptionsByIdQuery,
    productByIdQuery,
    productsByCategoryIdQuery,
    productsByCategoryTypeQuery,
} = require("../db/queries")

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

const getProductsByCategoryType = (id, callback) => {
    connection.query(
        productsByCategoryTypeQuery(id),
        (error, result) => {
            if (error) throw error;
            callback(result);
        }
    )
}


module.exports = {
    getProducts,
    getProductById,
    getProductsByCategoryId,
    getProductsByCategoryType,
};
