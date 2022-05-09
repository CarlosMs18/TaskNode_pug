
const express = require('express')
const session = require('express-session')
const flash  =require('connect-flash')

const bodyParser = require('body-parser')
const db = require('./config/db')
const authRoutes = require('./routes/auth')


const app = express()
app.use(express.static('public'))
app.set('view engine','pug')
app.set('views','views')

app.use(bodyParser.urlencoded({extended : false}))


app.use(session({
    secret : 'supersecret',
    resave : false,
    saveUninitialized :false
}))
app.use(flash())





app.use('/auth',authRoutes)


require('./models/usuarios')
db.sync()
        .then(result => {
            console.log('Conectado al servidor!')
            app.listen(3000)
        })
        .catch(err => console.log(err))

