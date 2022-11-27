const knex = require('../database/knex')

class BookService {
    constructor() {
        this.books = knex('bookinfo')
    }
    #getBook(payload) {
        const book = { ...payload };
        const bookProperties = [
            "bookNo", "bookCode", "bookName", "bookCategory", "bookAmout"
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

    // Find all
    async all() {
        return await this.books.select('*');
    }
    async findByName(name) {
        return await this.books
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    // Find one by id
    async findById(bookNo) {
        return await this.books.where('bookNo', bookNo).select('*').first();
    }

    // Update
    async update(bookNo, payload) {
        const update = this.#getBook(payload);
        return await this.books.where('bookNo', bookNo).update(update);
    }

    // Delete
    async delete(bookNo) {
        return await this.books.where('bookNo', bookNo).del();
    }

    // Find all Favorite
    async allFavorite() {
        return await this.books.where('favorite', 1).select('*');
    }

    // Delete all contacts
    async deleteAll() {
        return await this.books.del();
    }
}

module.exports = BookService;