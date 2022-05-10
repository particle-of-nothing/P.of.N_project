const connection = require("../db/connection");
const {categoriesQuery} = require("../db/queries")

const getCategories = (callback) => {
    connection.query(
        categoriesQuery(),
        (error, result, fields) => {
            if (error) throw error;
            callback(result);
        }
    )
}

module.exports = {
    getCategories
};
