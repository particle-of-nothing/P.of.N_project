class User {
    constructor(id, login, password, role, token) {
        
        if (!id || !login || !role || !password) {
            throw new Error('Invalid user properties');
        }

        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
        this.token = token;
    }

    serialize() {
        return JSON.stringify({
            id: this.id,
            login: this.login,
            role: this.role,
        })
    }
}

module.exports = {
    User,
}
