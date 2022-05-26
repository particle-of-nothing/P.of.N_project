const http = require('http');
const { PROTOCOL, HOST, PORT } = require('./consts');

const router = require('./router');

const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`I\m listening on ${PROTOCOL}${HOST}:${PORT}`);
});
