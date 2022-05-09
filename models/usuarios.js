const db = require('../config/db')
const Sequelize = require('sequelize')


const Usuarios = db.define('usuarios',{
    id :{
        type:Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            isEmail : {
                msg : 'Agrega un correo valido!'
            },
            notEmpty : {
                msg : 'El email no puede ir vacio!'
            }
        },
        unique : {
            args :true,
            msg : 'El email ya se encuentra en uso'
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate: {
            notEmpty :{
                msg : 'El password no puede ir vacio!'
            }
        }
    },

    active : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    }
})



module.exports = Usuarios