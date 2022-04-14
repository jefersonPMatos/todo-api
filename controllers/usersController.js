const { User, Task } = require("../database/models");
const JWT = require('jsonwebtoken')
const config = require("../config/auth");

const bcrypt = require("bcrypt");

const usersController = {
  formRegister: (req, res) => {},

  registerUser: async (req, res) => {
    const { name, email, password, birthday } = req.body;
    const avatar = req.file.filename;

    const userExist = await User.findAll({ where: { email } });
    console.log(userExist);

    if (userExist) {
      return res.status(500).json({ message: "Usuário já existe!" });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      name,
      avatar,
      email,
      password: hash,
      birthday,
    });

    return res.status(201).json({ newUser });
  },

  loginForm: async (req, res) => {},

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!user || !checkPassword) {
      return res.status(401).json({ message: "Usuário ou senha inválido!" });
    }
    
    const token = JWT.sign({ userId: user.id }, config.secret, { expiresIn: config.expireIn });
    return res.status(200).json({ user, auth: true, token });
    
  },

  updateForm: async (req, res) => {

  },

  update: async (req, res) => {

  },

  delete: async (req, res) => {
    const { id } = req.params
    console.log(req)
    if(req.user.userId != id ){
      return res.status(401).json({ message: "Você não tem autorização para deletar este usuário"})
    }

   const deletedUser = await User.destroy({ where: { id }})
    return res.status(200).json({ deletedUser, message: "Usuário deletado com sucesso"})

  }



};

module.exports = usersController;
