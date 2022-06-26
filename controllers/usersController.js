const { User, Task } = require("../database/models");
const JWT = require("jsonwebtoken");
const config = require("../config/auth");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

const usersController = {
  registerUser: async (req, res) => {
    const { email, password } = req.body;
    const avatar = req.file.filename;

    if (avatar == undefined || avatar === {}) {
      return res.json({ message: "Arquivo não encontrado" });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      return res.status(500).json({
        message: "Usuário já existe!",
      });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      avatar,
      email,
      password: hash,
    });

    return res.status(201).json({
      newUser,
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Usuário ou senha inválido!",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Usuário ou senha inválido!",
      });
    }

    const token = JWT.sign(
      {
        userId: user.id,
      },
      config.secret,
      {
        expiresIn: config.expireIn,
      }
    );
    return res.status(200).json({
      user,
      auth: true,
      token,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (req.user.userId != id) {
      return res.status(401).json({
        message: "Você não tem autorização para deletar este usuário",
      });
    } else {
      await User.update(
        {
          email,
          password,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    return res.status(200).json({
      user,
      message: "Usuário atualizado com sucesso",
    });
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (req.user.userId != id) {
      return res.status(401).json({
        message: "Você não tem autorização para deletar este usuário",
      });
    }

    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      deletedUser,
      message: "Usuário deletado com sucesso",
    });
  },

  recovery: async (req, res) => {
    if (req.user === undefined) {
      return res.status(500);
    }

    const { userId } = req.user;

    const user = await User.findOne({ where: { id: userId } });

    console.log(user);

    return res.status(200).json({
      user,
    });
  },
};

module.exports = usersController;
