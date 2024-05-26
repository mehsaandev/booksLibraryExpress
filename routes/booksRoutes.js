const express = require('express')
const routes = express.Router()
const {createPost} = require('../controllers/booksController')

routes.post('/getAllBooks/',createPost)
routes.post('/addBookToFaviorite/',createPost)
routes.post('/removeBookFromFaviorites/',createPost)



module.exports = routes