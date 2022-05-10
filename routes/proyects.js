const Router = require('express')
const router = Router()
const proyectController = require('../controllers/proyects')
const isAuth  = require('../middlewares/is-auth')


router.get('/',isAuth, proyectController.ProyectHome)

module.exports = router