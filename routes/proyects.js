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
    .isLength({min : 5})
],proyectController.createProyect)


router.get('/proyect/:url',isAuth,proyectController.proyectUrl)

router.post('/proyect/:url',isAuth,[
    check('tarea','El nombre de la tarea debe de tener un minimo de 4 caracteres')
    .not().isEmpty().trim().escape()
    .isLength({min : 4})
],taskController.createTask)


router.get('/proyect/edit/:proyectId',isAuth,proyectController.formeditProyect)


/* router.get('/new-proyect/:proyectId',isAuth , proyectController.postEditProyect) */


router.post('/new-proyect/:proyectId',isAuth,[
    check('nombre','El proyecto debe de tener un minimo de 5 caracteres')
    .not().isEmpty().trim().escape()
    .isLength({min : 5})
],proyectController.postEditProyect)


router.delete('/proyects/:url',isAuth,proyectController.deleteProyect)

router.patch('/task/:taskId',isAuth,proyectController.patchTask)


router.delete('/task/:taskId', isAuth,proyectController.deleteTask)
module.exports = router