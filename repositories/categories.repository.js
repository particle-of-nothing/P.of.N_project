const connection = require("../db/connection");
const {
    categoriesQuery,
    categoriesByTypeQuery
} = require("../db/queries")

const getCategories = (callback) => {
    connection.query(
        categoriesQuery(),
        (error, result, fields) => {
            if (error) throw error;
            callback(result);
        }
    )
}

const getCategoriesByType = (id, callback) => {
    connection.query(
        categoriesByTypeQuery(id),
        (error, result) => {
            if (error) throw error;
            callback(result);
        }
    )
}


module.exports = {
    getCategories,
    getCategoriesByType,
};
