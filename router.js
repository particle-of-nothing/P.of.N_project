const { getCategories } = require("./repositories/categories.repository");
const { getProducts, getProductById, getProductsByCategoryId, getProductsByCategoryType } = require("./repositories/products.repository");
const setGeneralHeaders = (response) => {
    response.writeHead(
        200,
        {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*"
        }
    );
};
const readBody = (request, callback) => {
    let data = "";

    request.on("data", chunk => {
        data += chunk;
    });

    request.on("end", () => {
        callback(data);
    });
}
const routes = [
    (request, response) => {
        if (request.method === 'OPTIONS') {
            response.end();
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/products' && request.method === 'GET') {
            getProducts(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === '/categories' && request.method === 'GET') {
            getCategories(result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/products\/(\d+)$/);
        if (match != null && match[1] && request.method === 'GET') {
            getProductById(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        // Продукты по id категории
        const match = request.url.match(/^\/products\?category=(\d+)$/);
        if (match != null && match[1] && request.method === 'GET') {
            getProductsByCategoryId(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        const match = request.url.match(/^\/category\?type=(\d+)$/);
        if (match != null && match[1] && request.method === 'GET') {
            getProductsByCategoryType(match[1], result => response.end(JSON.stringify(result)));
            return true;
        }
    },
    (request, response) => {
        if (request.url === "/packets" && request.method === "POST") {
            readBody(request, data => {
                const parsed = JSON.parse(data)
                response.end(JSON.stringify(parsed['кей']));
            });

            return true;
        }
    },
];

const router = (request, response) => {
    const hasMatch = routes.some((route) => {
        setGeneralHeaders(response)
        return route(request, response);
    })
    if (!hasMatch) {
        response.end('Default response');
    }
};

module.exports = router;
