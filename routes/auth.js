const authController = require('../controllers/auth')
const {check }= require('express-validator')
const Router = require('express')
const { route } = require('./proyects')

const router = Router()

router.get('/signup',authController.formSignup)

router.post('/signup',authController.postSignUp)


router.get('/signin',authController.formSignIn)


router.post('/signin',authController.postSignIn)

router.get('/signoff',authController.signOff)


router.get('/reset',authController.formResetPassword)

router.post('/reset',authController.createToken)

router.get('/reset/:token',authController.validateToken)

router.post('/reset/:token',[
    check('password','La contraseña debe de tener un minimo de 5 caracteres')
    .not().isEmpty()
    .isLength({min : 5})
],authController.resetNewPassword)
module.exports = router