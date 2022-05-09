const Usuarios = require("../models/usuarios")


exports.formSignup = (req, res , next) => { 
    res.render('auth/signup',{
        pageTitle : 'Sign Up'
    })
}


exports.postSignUp = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        await Usuarios.create({
            email,
            password
        })

        
    } catch (error) {
        console.log('aaaaaa')
        console.log(error.errors.map(e => console.log(e.message)))
    }
}