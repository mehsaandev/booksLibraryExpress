const express = require('express')
const routes = express.Router()
const {getBooks} = require('../controllers/booksController')

routes.get('/getAllBooks/',getBooks)
// routes.post('/addBookToFaviorite/',createPost)
// routes.post('/removeBookFromFaviorites/',createPost)



module.exports = routes