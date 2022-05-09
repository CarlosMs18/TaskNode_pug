const authController = require('../controllers/auth')
const Router = require('express')

const router = Router()

router.get('/signup',authController.formSignup)

router.post('/signup',authController.postSignUp)

module.exports = router