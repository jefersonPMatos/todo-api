const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/uploadAvatar');
const usersController = require('../controllers/usersController');
const userAuth = require('../middlewares/userAuth')

router.get('/cadastrar', usersController.formRegister);
router.post('/cadastrar', uploadAvatar, usersController.registerUser);
router.get('/login', usersController.loginForm);
router.post('/login', usersController.login)
router.get('/:id', userAuth, usersController.updateForm);
router.post('/:id', userAuth, usersController.update);
router.delete('/:id', userAuth, usersController.delete)


module.exports = router;
