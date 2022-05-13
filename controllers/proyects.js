const Proyects = require('../models/proyects')
const Tareas = require('../models/tareas')
const {validationResult} = require('express-validator')
exports.ProyectHome = async(req, res , next) => {
    
    const usuarioId = res.locals.usuario.id
    const proyects = await Proyects.findAll({where : {usuarioId}})
    
    res.render('proyects/index',{
        pageTitle : 'Home',
        proyects
    })
}


exports.formNewProyect = async(req, res , next) => {
    const usuarioId = res.locals.usuario.id
    const proyects = await Proyects.findAll({where : {usuarioId}})
    res.render('proyects/form-proyect',{
        pageTitle : 'New Proyect',
        proyects
    })
}


exports.createProyect = async(req, res , next) =>{

    const nombre = req.body.nombre

    const usuarioId = res.locals.usuario.id
    const proyects = await Proyects.findAll({where : {usuarioId}})

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render('proyects/form-proyect',{
            pageTitle : 'New Proyect',
            errores : errors.array()[0].msg,
            proyects
        }) 
    }

    try {
        const usuarioId = res.locals.usuario.id
        await Proyects.create({
            nombre,
            usuarioId
        })
        res.redirect('/')

    } catch (error) {
        next(error)
    }
}


exports.proyectUrl = async(req, res , next) => {
   
    const url = req.params.url
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

   
    res.render('proyects/task',{
        pageTitle : proyect.nombre,
        proyects,
        proyect,
        tareas
    })
}



exports.formeditProyect = async(req, res , next) => {
    const usuarioId = res.locals.usuario.id
    const id = req.params.proyectId
    const proyectsPromise = await Proyects.findAll({where : {usuarioId}})
    
    const proyectPromise = await Proyects.findOne({where :{
        id,
        usuarioId
    }})

    const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise])
    


    res.render('proyects/form-proyect',{
        pageTitle : proyect.nombre,
        proyects,
        proyect
    })
}


exports.postEditProyect = async(req, res , next) => {
       const id = req.params.proyectId
       const usuarioId = res.locals.usuario.id  
        const nombre = req.body.nombre
       const proyectsPromise = await Proyects.findAll({where : {usuarioId}})
    
       const proyectPromise = await Proyects.findOne({where :{
           id,
           usuarioId
       }})
       const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise])

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('proyects/form-proyect',{
                errores : errors.array()[0].msg,
                pageTitle : proyect.nombre,
                proyects,
                proyect
            })
        }
        
       
        try {
            proyect.nombre = req.body.nombre
            await proyect.save()
            
            res.redirect('/')
        } catch (error) {
            next(error)
        }

       



     
}