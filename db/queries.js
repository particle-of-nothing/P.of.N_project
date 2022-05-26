const productsQuery = () => {
    return 'SELECT * FROM products';
}

const categoriesQuery = () => {
    return 'SELECT * FROM categories';
}

const productByIdQuery = (id) => {
    return `
        SELECT *
        FROM products
        WHERE products.id_product =${id}
    `;
}

const productOptionsByIdQuery = (id) => {
    return `
        SELECT option_name, description, value
        FROM product_option
        JOIN options ON options.id_option = product_option.id_option
        WHERE product_option.id_product =${id}
    `;

}

const productsByCategoryIdQuery = (id) => {
    return `
        SELECT *
        FROM products
        WHERE products.id_category =${id}
`
}

const productsByCategoryTypeQuery = (id) => {
    return `
        SELECT *
        FROM categories
        WHERE categories.type =${id}
`
}

const searchProductsQuery = (pattern) => {
    return `
        SELECT *
        FROM products
        WHERE products.product_name LIKE '%${pattern}%'
`
}

module.exports = {
    productsQuery,
    categoriesQuery,
    productByIdQuery,
    productOptionsByIdQuery,
    productsByCategoryIdQuery,
    productsByCategoryTypeQuery,
    searchProductsQuery,
}
