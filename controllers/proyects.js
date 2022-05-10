exports.ProyectHome = async(req, res , next) => {
    console.log(res.locals.usuario)
    console.log(req.user)
    res.render('proyects/index',{
        pageTitle : 'Home'
    })
}