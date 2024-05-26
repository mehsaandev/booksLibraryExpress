const express = require('express')
const routes = express.Router()
const {getBooks,createBook,bulkCreateBook,addToFaviorite} = require('../controllers/booksController')

routes.get('/getAllBooks/',getBooks)
routes.post('/addBook/',createBook)
routes.post('/bulkAddBook/',bulkCreateBook)
routes.patch('/addBookToFaviorite/:id',addToFaviorite)
// routes.post('/removeBookFromFaviorites/',createPost)



module.exports = routes