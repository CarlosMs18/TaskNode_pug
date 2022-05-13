
const express = require('express')
const session = require('express-session')
const flash  =require('connect-flash')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
const bodyParser = require('body-parser')


const db = require('./config/db')

const authRoutes = require('./routes/auth')
const proyectRoutes = require('./routes/proyects')


const errorController = require('./controllers/error')

const app = express()
app.use(express.static('public'))
app.set('view engine','pug')
app.set('views','views')

app.use(bodyParser.urlencoded({extended : false}))

app.use(cookieParser())
app.use(session({
    secret : 'supersecret',
    resave : false,
    saveUninitialized :false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req,res, next) => {
    res.locals.mensajes = req.flash()
    res.locals.usuario = {...req.user} || null
    next()
})



app.use('/auth',authRoutes)
app.use('/',proyectRoutes)


app.use(errorController.get404)


app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
    res.status(500).render('500', {
        pageTitle: 'Error!',
        user :req.user
    });
  });



const Proyects = require('./models/proyects')
const Usuarios = require('./models/usuarios')
const Tareas = require('./models/tareas')
Usuarios.hasMany(Proyects)
Tareas.belongsTo(Proyects)
/* Proyects.hasOne(Usuarios) */

db.sync()
        .then(result => {
            console.log('Conectado al servidor!')
            app.listen(3000)
        })
        .catch(err => console.log(err))

require('./handlers/email')