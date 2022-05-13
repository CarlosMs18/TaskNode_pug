const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Usuarios = require('../models/usuarios')

passport.use(
    new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async(email ,password, done) => {
            try{

                const usuario = await Usuarios.findOne({
                    where :{
                        email,
                        active : 1
                    }
                })
                if(!usuario.verificarPassword(password)){
                    return done(null, false,{
                        message : 'Password Incorrect'
                    })
                }

                return done(null, usuario)
            }catch(error){
                return done(null, false,{
                    message : 'Esta cuenta no existe'
                })
            }
        }
    )
)


// serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});


module.exports = passport