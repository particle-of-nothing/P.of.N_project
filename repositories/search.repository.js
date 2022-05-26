const connection = require("../db/connection");
const { searchProductsQuery } = require("../db/queries");

const search = (pattern, callback) => {
    const result = {
        products: [],
        categories: [],
        packets: [],
    };
    connection.query(
        searchProductsQuery(pattern),
        (error, products) => {
            if (error) throw error;
            result.products = products;
            callback(result);
        }
    )
}

module.exports = {
    search
};