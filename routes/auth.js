const authController = require('../controllers/auth')
const Router = require('express')

const router = Router()

router.get('/signup',authController.formSignup)

router.post('/signup',authController.postSignUp)


router.get('/signin',authController.formSignIn)


router.post('/signin',authController.postSignIn)
module.exports = router