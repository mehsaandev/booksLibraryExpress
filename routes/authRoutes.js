const express = require('express')
const routes = express.Router()
const {signIn,signUp} = require('../controllers/authController')

routes.post('/login/',signIn)
routes.post('/register/',signUp)



module.exports = routes