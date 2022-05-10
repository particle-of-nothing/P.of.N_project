const { getCategories } = require("./repositories/categories.repository");
const { getProducts, getProductById } = require("./repositories/products.repository");

const router = (request, response) => {
    if (request.url === '/products') {
        getProducts(result => response.end(JSON.stringify(result)));
        return;
    }
    
    if (request.url === '/categories') {
        getCategories(result => response.end(JSON.stringify(result)));
        return;
    }
    
    const match = request.url.match(/^\/products\/(\d+)$/);
    if (match != null && match[1]) {
        getProductById(match[1], result => response.end(JSON.stringify(result)));
        return;
    }

    response.end('Default response');
};

module.exports = router;
