const http = require('http');

const router = require('./router');

const HOST = 'localhost';
const PORT = '8000';
const PROTOCOL = 'http';

const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`I\m listening on ${PROTOCOL}://${HOST}:${PORT}`);
});
