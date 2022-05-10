const db = require('../config/db')
const Sequelize = require('sequelize')
const bcryptjs = require('bcryptjs')


const Usuarios = db.define('usuarios',{
    id :{
        type:Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
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
    },
    token : Sequelize.STRING,
    expiration : Sequelize.STRING
},{
    hooks: {
        beforeCreate(usuario){
           
            usuario.password = bcryptjs.hashSync(usuario.password, bcryptjs.genSaltSync(10))
        }
    }
})

Usuarios.prototype.verificarPassword = function(password){
    return bcryptjs.compareSync(password, this.password)
}


module.exports = Usuarios