const knex = require('../database/knex')

class AccService {
    constructor() {
        this.accs = knex('account')
    }
    #getAcc(payload) {
        const acc = { ...payload };
        const accProperties = [
            "accId", "accUsername", "accPassword", "note",
        ];

        Object.keys(acc).forEach(function (key) {
            if (accProperties.indexOf(key) == -1) {
                delete acc[key];
            }
        });
        return acc;
    }
    async create(payload) {
        const acc = this.#getAcc(payload);
        const [accId] = await this.accs.insert(acc);
        return { accId, ...acc };
    }
}
module.exports = AccService;