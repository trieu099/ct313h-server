const knex = require('../database/knex')

class CustomerService {
    constructor() {
        this.cuss = knex('listbook')
    }
    #getCus(payload) {
        const cus = { ...payload };
        const cusProperties = [
            "listId", "cusName", "bookCode", "date",
        ];

        Object.keys(cus).forEach(function (key) {
            if (cusProperties.indexOf(key) == -1) {
                delete cus[key];
            }
        });
        return cus;
    }

    async create(payload) {
        const cus = this.#getCus(payload);
        const [listId] = await this.cuss.insert(cus);
        return { listId, ...cus };
    }
    async all() {
        return await this.cuss.select('*');
    }
    async findByName(cusName) {
        return await this.cuss
            .where('cusName', 'like', `%${cusName}%`)
            .select('*');
    }

    // Find one by id
    async findById(listId) {
        return await this.cuss.where('listId', listId).select('*').first();
    }

    // Update
    async update(listId, payload) {
        const update = this.#getCus(payload);
        return await this.cuss.where('listId', listId).update(update);
    }

    // Delete
    async delete(listId) {
        return await this.cuss.where('listId', listId).del();
    }
    

}
module.exports = CustomerService;