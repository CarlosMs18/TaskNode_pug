
const express = require('express')
const session = require('express-session')
const flash  =require('connect-flash')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
const bodyParser = require('body-parser')


const db = require('./config/db')

const authRoutes = require('./routes/auth')
const proyectRoutes = require('./routes/proyects')

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

require('./models/usuarios')
db.sync()
        .then(result => {
            console.log('Conectado al servidor!')
            app.listen(3000)
        })
        .catch(err => console.log(err))

