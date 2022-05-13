const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')
const path = require('path')

let transport = nodemailer.createTransport({
    host : emailConfig.host,
    port : emailConfig.port,
    
    auth : {
        user : emailConfig.user,
        pass : emailConfig.pass
    }
})

//generate htmlToText
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    /* const html = pug.renderFile(path.join(__dirname , '../views','/emails',`/${archivo}.pug`,opciones)) */
    //renderfile permite como segunda parametro pide opciones opcional
    return juice(html)
}

exports.enviar = async(opciones) => {
   
    const html =  generarHTML(opciones.archivo,opciones)
    const text = htmlToText.htmlToText(html)
    let opcionesEmail = {
        from : 'UpTask <no-reply@uptask.com>',
        to: opciones.usuario.email,
        subject :opciones.subject,
         
        text ,
        html 
    }
    console.log(opcionesEmail.html)
    
    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, opcionesEmail)
    
}
