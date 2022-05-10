const connection = require("../db/connection");
const {productsQuery} = require("../db/queries")

const getProducts = (callback) => {
    connection.query(
        productsQuery(),
        (error, result, fields) => {
            if (error) throw error;
            callback(result);
        }
    )
}


module.exports = {
    getProducts
};
