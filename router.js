const { getProducts } = require("./repositories/products.repository");

const router = (request, response) => {
    if (request.url === '/products') {
        getProducts(result => response.end(JSON.stringify(result)));
        return;
    }

    response.end('Default response');
};

module.exports = router;
