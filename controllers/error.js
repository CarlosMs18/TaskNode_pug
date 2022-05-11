exports.get404 = (req, res , next) => {
    
    res.status(404).render('404',{
        user : req.user,
        pageTitle : 'Page Not Found'
    })
}


