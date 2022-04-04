const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/uploadAvatar')

const usersController = require('../controllers/usersController')

router.get('/cadastrar', usersController.formRegister)
router.post('/cadastrar',uploadAvatar, usersController.registerUser)

module.exports = router;
