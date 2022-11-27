const express = require('express');
const cors = require('cors');
const ApiError = require('./api-error');

const app = express();


app.use(cors());
app.use(express.json());

const libraryController = require('./controllers/Library.controller');

app.get('/',(req,res) => {
    res.json({message: 'Nguyen Duc Trieu!'});
});

app.route('/api/books')
    .get(libraryController.findAll)
    .post(libraryController.create)
    .delete(libraryController.delete);

// Handle 404 response.
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
    });
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
    message: error.message || 'Internal Server Error',
    });
    });
module.exports = app;