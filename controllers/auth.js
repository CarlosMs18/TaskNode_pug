const Usuarios = require("../models/usuarios")
const passport = require('passport')
const crypto = require('crypto')
const {validationResult} = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcryptjs = require('bcryptjs')
const enviarEmail = require('../handlers/email')

exports.formSignup = (req, res , next) => { 
    const {error} = res.locals.mensajes
  
    res.render('auth/signup',{
        
        pageTitle : 'Sign Up',
      
    })
    console.log('aqui!')
}




exports.postSignUp = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        await Usuarios.create({
            email,
            password
        })

        //create url to confirm email
        const confirmarUrl= `http://${req.headers.host}/auth/confirm/${email}`

        //create object user

        const usuario = {
            email
        }


        //send mail
        await enviarEmail.enviar({
        usuario,
        subject: 'Confirmar tu cuenta de Uptask',
        confirmarUrl,
        archivo: 'confirmar-cuenta'
    })
        // redirect user

        req.flash('correcto','Enviamos un correo, confirma tu cuenta')
      
        res.redirect('/auth/signin')


        
    } catch (error) {  
        req.flash('error',error.errors.map(e => e.message))
       
        res.render('auth/signup',{
            mensajes : req.flash(),
            pageTitle : 'Sign Up'
        })
    
    }
}


exports.formSignIn = (req, res , next) => {
    console.log(res.locals.usuario)
    const {correcto} = res.locals.mensajes
    
    res.render('auth/signin',{
        pageTitle : 'Sign In',

    })
}



exports.postSignIn = passport.authenticate('local',{
    successRedirect: '/', 
    failureRedirect: '/auth/signin',
    failureFlash : true,
    badRequestMessage: 'Ambos Campos son Obligatorios'

})


exports.signOff = (req, res,next) => {
        req.session.destroy(() => {
            res.redirect('/auth/signin')
        })
}


exports.formResetPassword = (req, res , next) => {
    
    res.render('auth/reset-password',{
        pageTitle : 'Reset Password'
    })
}



exports.createToken = async(req, res , next) => {
    
    const email = req.body.email

    const usuario  = await Usuarios.findOne({where : {email}})
    
    if(!usuario){
        req.flash('error','El email ingresado no existe')
        return res.redirect('/auth/reset')
    }

    usuario.token = crypto.randomBytes(20).toString('hex')
    usuario.expiration = Date.now() +  3600000


    await usuario.save()
  
   
    const resetUrl= `http://${req.headers.host}/auth/reset/${usuario.token}`

    
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reset-password'
    })
   
    req.flash('correcto','El usuario se ha enviado de manera correcta')
    res.redirect('/auth/signin')
}





exports.validateToken = async(req, res , next) => {
    const token = req.params.token
    const usuario  =await Usuarios.findOne({
       where:{
           token
       }
   })

   
   if(!usuario){
       req.flash('error', 'Solicitud no valida!')
       return res.redirect('/auth/reset')
   }

   
   res.render('auth/new-password',{
       pageTitle : 'New Password'
   })
}


exports.resetNewPassword = async(req, res , next) =>{
    const password = req.body.password
    const token = req.params.token
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render('auth/new-password',{
            pageTitle : 'New Password',
            error : errors.array()[0].msg   
        })
    }    


    try {
        const usuario = await Usuarios.findOne({
            where : {
                token,
                expiration : {
                    [Op.gte] : Date.now()
                }
            }
        })
        
        if(!usuario){
            req.flash('error','No valido!!')
            return res.redirect('/auth/reset')
        }
        
        usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
        await usuario.save()
        req.flash('correcto','Su contraeña se actualizo de manera correcta')
        res.redirect('/auth/signin')


    } catch (error) {
        next(error)
    }
}



exports.confirmEmail = async(req, res , next) => {
   const email = req.params.email
   
   const usuario = await Usuarios.findOne({
       where : {email}
   })

   if(!usuario){
       req.flash('error','No valido!')
       return res.redirect('/auth/signup')
   }
  
   usuario.active =  1
   await usuario.save()
   req.flash('correcto', 'Cuenta activada correctamente');
   res.redirect('/auth/signin')
}