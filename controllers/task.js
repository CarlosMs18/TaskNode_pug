const {validationResult} = require('express-validator')
const Proyects = require('../models/proyects')
const Tareas = require('../models/tareas')
exports.createTask = async(req, res , next) => {

    
    const url = req.params.url
    const tarea = req.body.tarea
    const usuarioId = res.locals.usuario.id


    const proyectsPromise = await Proyects.findAll({where : {usuarioId}})
    const proyectPromise = await Proyects.findOne({where: {
        url ,
        usuarioId
       
    }})

    const [proyects , proyect] = await Promise.all([proyectsPromise, proyectPromise])
    const tareas = await Tareas.findAll({where : {
        proyectoId : proyect.id
    }})

    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render('proyects/task',{
            errores : errors.array()[0].msg,
            pageTitle : proyect.nombre,
            proyects,
            proyect,
            tareas
        })
    }

    
    try {
        await Tareas.create({
            tarea,
            proyectoId : proyect.id
        })

        res.redirect(`/proyect/${req.params.url}`)
    } catch (error) {
        next(error)
    }
}