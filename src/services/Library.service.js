const knex = require('../database/knex')

class BookService {
    constructor() {
        this.books = knex('bookinfo')
    }
    #getBook(payload) {
        const book = { ...payload };
        const bookProperties = [
            "bookNo", "bookCode", "bookName", "bookCategory", "bookAmount"
        ];

        Object.keys(book).forEach(function (key) {
            if (bookProperties.indexOf(key) == -1) {
                delete book[key];
            }
        });
        return book;
    }

    async create(payload) {
        const book = this.#getBook(payload);
        const [bookNo] = await this.books.insert(book);
        return { bookNo, ...book };
    }

    async all() {
        return await this.books.select('*');
    }
    async findByName(bookName) {
        return await this.books
            .where('bookName', 'like', `%${bookName}%`)
            .select('*');
    }

    // Find one by id
    async findById(bookCode) {
        return await this.books.where('bookCode', bookCode).select('*').first();
    }

    // Update
    async update(bookCode, payload) {
        const update = this.#getBook(payload);
        return await this.books.where('bookCode', bookCode).update(update);
    }

    // Delete
    async delete(bookCode) {
        return await this.books.where('bookCode', bookCode).del();
    }


    async deleteAll() {
        return await this.books.del();
    }
}

module.exports = BookService;