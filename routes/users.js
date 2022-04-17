const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/uploadAvatar');
const usersController = require('../controllers/usersController');
const userAuth = require('../middlewares/userAuth')

router.post('/cadastrar', uploadAvatar, usersController.registerUser);
router.post('/login', usersController.login)
router.post('/:id', userAuth, usersController.update);
router.delete('/:id', userAuth, usersController.delete)


module.exports = router;
