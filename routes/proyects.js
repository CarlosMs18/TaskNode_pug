const Router = require('express')
const router = Router()
const proyectController = require('../controllers/proyects')
const taskController = require('../controllers/task')
const isAuth  = require('../middlewares/is-auth')
const {check} = require('express-validator')


router.get('/',isAuth,proyectController.ProyectHome)


router.get('/new-proyect',isAuth,proyectController.formNewProyect)


router.post('/new-proyect',isAuth,[
    check('nombre','El proyecto debe de tener un minimo de 5 caracteres')
    .not().isEmpty().trim().escape()
    .isLength({min : 8})
],proyectController.createProyect)


router.get('/proyect/:url',isAuth,proyectController.proyectUrl)

router.post('/proyect/:url',isAuth,[
    check('tarea','El nombre de la tarea debe de tener un minimo de 4 caracteres')
    .not().isEmpty().trim().escape()
    .isLength({min : 4})
],taskController.createTask)

module.exports = router