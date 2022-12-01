const BookService = require('../services/Library.service');
const ApiError = require('../api-error');
// const e = require('express');

// create and save a new book
exports.create = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, 'Name can not be empty'));
    // }
    try {
        const bookService = new BookService();
        const book = await bookService.create(req.body);
        return res.send(book);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while creating the book')
        );
    }
};
exports.findAll = async (req, res, next) => {
    let books = [];

    try {
        const bookService = new BookService();
        const { name } = req.query;
        if (name) {
            books = await bookService.findByName(name);
        } else {
            books = await bookService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving books')
        );
    }
    return res.send(books);
};
exports.findOne = async( req,res,next) => {
    try {
        const bookService = new BookService();
        const book = await bookService.findById(req.params.bookCode);
        if (!book) {
            return next(new ApiError(404,'book not found'));
        }
        return res.send(book);
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving book with id = ${req.params.bookCode}`));
        
    }
};
//update
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const bookService = new BookService();
        const updated = await bookService.update(req.params.bookCode, req.body);
        if (!updated) {
            return next(new ApiError(404, 'book not found'));
        } 
        return res.send({ message: 'Book was updated successfully'});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500, 
                `Error updating book with book code=${req.params.bookCode}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService();
        const deleted = await bookService.delete(req.params.bookCode);
        if (!deleted) {
            return next(new ApiError(404, 'Book not found'));
        } 
        return res.send({ message: 'Book was deleted successfully'});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500, 
                `Could not delete book with id=${req.params.bookCode}`
            )
        );
    }
};



// Delete all books of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService();
        const deleted = await bookService.deleteAll();
        return res.send({
            message: `${deleted} books were deleted successfully`
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500, 
                'An error occurred while removing all books'
            )
        );
    }
};

