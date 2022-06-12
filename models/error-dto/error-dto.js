class ErrorDTO {
    data = {};

    constructor(status, code, message) {
        this.status = status;
        this.data.code = code;

        if (message) { this.data.message = message; }
    }

    serialize() {
        return JSON.stringify(this.data);
    }
}

module.exports = {
    ErrorDTO
}
