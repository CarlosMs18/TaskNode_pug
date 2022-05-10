const authController = require('../controllers/auth')

const Router = require('express')
const { route } = require('./proyects')

const router = Router()

router.get('/signup',authController.formSignup)

router.post('/signup',authController.postSignUp)


router.get('/signin',authController.formSignIn)


router.post('/signin',authController.postSignIn)

router.get('/signoff',authController.signOff)
module.exports = router