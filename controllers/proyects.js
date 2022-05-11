const Proyects = require('../models/proyects')
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
    const proyects = await Proyects.findAll({where : {usuarioId}})
    const proyect = await Proyects.findOne({where: {
        url ,
        usuarioId
       
    }})
   
    res.render('proyects/task',{
        pageTitle : proyect.nombre,
        proyects,
        proyect
    })
}



