const Usuarios = require("../models/usuarios")
const passport = require('passport')

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
        req.flash('correcto','El usuario se creo correctamente')
      
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


exports.signOff = (req, res) => {
        req.session.destroy(() => {
            res.redirect('/auth/signin')
        })
}
