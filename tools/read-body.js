const readBody = (request, callback) => {
    let data = "";

    request.on("data", chunk => {
        data += chunk;
    });

    request.on("end", () => {
        callback(data);
    });
}

module.exports = {
    readBody,
};