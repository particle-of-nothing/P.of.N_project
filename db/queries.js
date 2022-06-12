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

const getProductsByPacketIdQuery = (id) => {
    return `
        SELECT products.id_product AS id_product, product_name, description, id_category, photo, quantity
        FROM products
        JOIN packets_products ON products.id_product = packets_products.id_product
        WHERE packets_products.id_packet = ${id}
`
}

const categoriesByTypeQuery = (id) => {
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

const getPacketsQuery = () => {
    return `
        SELECT *
        FROM packets
`
}

const getPacketByIdQuery = (id) => {
    return `
        SELECT *
        FROM packets
        WHERE packets.id_packet = ${id}
`
}

const createPacketQuery = (userId) => {
    return `
        INSERT INTO packets (id_user)
        VALUES (${userId});
`
}

const renamePacketQuery = (id, newName) => {
    return `
        UPDATE packets
        SET name = '${newName}'
        WHERE packets.id_packet = ${id};
`
}

const findProductInPacketQuery = (packetId, productId) => {
    return `
        SELECT * FROM packets_products
        WHERE
            packets_products.id_packet = ${packetId}
            AND
            packets_products.id_product = ${productId};
`
}

const addProductToPacketQuery = (packetId, productId) => {
    return `
        INSERT INTO packets_products (id_packet, id_product, quantity)
        VALUES (${packetId}, ${productId}, 1);
`
}

const updateProductQuantityInPacketQuery = (packetId, productId, quantity) => {
    return `
        UPDATE packets_products
        SET quantity = '${quantity}'
        WHERE
            packets_products.id_packet = ${packetId}
            AND
            packets_products.id_product = ${productId};
`
}

const deleteProductFromPacketQuery = (packetId, productId) => {
    return `
        DELETE FROM packets_products
        WHERE
            packets_products.id_packet = ${packetId}
            AND
            packets_products.id_product = ${productId};
`
}


module.exports = {
    productsQuery,
    categoriesQuery,
    productByIdQuery,
    productOptionsByIdQuery,
    productsByCategoryIdQuery,
    categoriesByTypeQuery,
    searchProductsQuery,
    createUserQuery,
    getUserByLoginQuery,
    getUserByIdQuery,
    createProfileQuery,
    getProductsByPacketIdQuery,
    getPacketByIdQuery,
    createPacketQuery,
    getPacketsQuery,
    renamePacketQuery,
    addProductToPacketQuery,
    findProductInPacketQuery,
    updateProductQuantityInPacketQuery,
    deleteProductFromPacketQuery,
}
