module.exports = {
    userLogged(req, res, next) {
        if(typeof req.session.user === 'undefined') {
            return res.redirect('/usuario/login')
        }
        next()
    }
}
