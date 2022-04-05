const { User } = require('../database/models')

const bcrypt = require('bcrypt');



const usersController = {
    formRegister: (req, res) => {
        res.render('form-register-user')
    },

    registerUser: async (req, res) => {
        const { name, email,password,birthday } = req.body;
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

    },

    loginForm: async (req, res) => {
        res.render('login')
    },

    login: async (req, res) => {
        
        const { email, password } = req.body

        const user = await User.findOne({ where:{ email }})

        if(!user) {
            return res.render('login')
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        if(!checkPassword){
            return res.send('Email ou senha inválido')
        }

        delete user.password
        req.session.user = user

        res.send('Você está logado!').catch(console.log)
    }
}

module.exports = usersController;