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
        SELECT option_name, description, value, units
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

const createUserQuery = (login, password, role) => {
    return `
        INSERT INTO users (login, password, role)
        VALUES ('${login}', '${password}', ${role});
`
}

const createProfileQuery = (userId) => {
    return `
        INSERT INTO profiles (id_user)
        VALUES (${userId});
`
}

const getUserByIdQuery = (id) => {
    return `
        SELECT id_user, login, role, password
        FROM users
        WHERE id_user = ${id}
`
}

const getUserByLoginQuery = (login) => {
    return `
        SELECT id_user, login, role, password
        FROM users
        WHERE login = '${login}'
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
    createUserQuery,
    getUserByLoginQuery,
    getUserByIdQuery,
    createProfileQuery,
}
