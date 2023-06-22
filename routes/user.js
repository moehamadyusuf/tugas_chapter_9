const ctrl = require('../controllers/user')
const router = require('express').Router()

router
    .post('/register', ctrl.register)
    .post('/login',ctrl.login)
    
module.exports = router