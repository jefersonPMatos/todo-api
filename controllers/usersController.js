const {
    User
} = require('../database/models')

const bcrypt = require('bcrypt');




const usersController = {
    formRegister: (req, res) => {
        res.render('form-register-user')
    },
    registerUser: async (req, res) => {
        const {
            name,
            email,
            password,
            birthday
        } = req.body;
        const avatar = req.file.filename
        
        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds);

        const newUser = await User.create({
            name,
            avatar,
            email,
            password: hash,
            birthday
        }).catch(console.log);

        res.send('Usuário cadastrado com sucesso!')
        console.log(newUser)

    }
}

module.exports = usersController;