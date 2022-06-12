class Packet {
    constructor(id, name, userId, products = []) {
        if (!id) {
            throw new Error('No id was provided in Packet constructor')
        }

        if (!userId) {
            throw new Error('No userId eas provided in Packet constructor')
        }

        this.id = id;
        this.name = name;
        this.userId = userId;
        this.products = products;
    }

    serialize() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            userId: this.userId,
            products: this.products,
        });
    }
}

module.exports = {
    Packet,
}
