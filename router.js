const { getCategories } = require("./repositories/categories.repository");
const { getProducts, getProductById, getProductsByCategoryId } = require("./repositories/products.repository");

const routes = [
    (request, response) => {
        if (request.url === '/products') {
            getProducts(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/categories') {
            getCategories(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/products\/(\d+)$/);
        if (match != null && match[1]) {
            getProductById(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/products\?category=(\d+)$/);
        if (match != null && match[1]) {
            getProductsByCategoryId(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/category\?type=(\d+)$/);
        if (match != null && match[1]) {
            getProductsByCategoryType(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    }
];

const router = (request, response) => {
    const hasMatch = routes.some(route => route(request, response));
    if (!hasMatch) {
        response.end('Default response');
    }
};

module.exports = router;
