const bcrypt = require('bcrypt');

const usersController = {
    formRegister: (req, res) => {
        res.render('form-register-user')
    },
    registerUser: (req, res) => {
        const user = req.body
    }
}

module.exports = usersController;