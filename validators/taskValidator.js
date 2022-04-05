const { check } = require('express-validator')

const taskValidator = 
[
    check("details").notEmpty().withMessage("Você precisa adicionar algum conteúdo!"), 
]

module.exports = taskValidator