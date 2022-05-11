const db = require('../config/db')
const shortid = require('shortid')
const slug = require('slug')
const Sequelize = require('sequelize')



const Proyects = db.define('proyectos',{
    id:{
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },

    nombre : Sequelize.STRING,
    url : Sequelize.STRING
},{
    hooks : {
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLocaleLowerCase()
            proyecto.url = `${url}-${shortid.generate()}`
        }
    }
})

/* Proyects.hasOne(Usuarios) */

module.exports = Proyects