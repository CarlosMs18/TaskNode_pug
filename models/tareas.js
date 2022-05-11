const db = require('../config/db')
const Sequelize = require('sequelize')
const Proyects = require('../models/proyects')


const Tareas = db.define('tareas',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    tarea :{
        type : Sequelize.STRING
    },
    estado : {
        type:Sequelize.INTEGER,
        defaultValue : 0
    }
})



module.exports = Tareas