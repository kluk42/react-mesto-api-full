const router = require('express').Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateAvatar,
    login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const requestValidation = require('../middlewares/request-validation');

router.get('/users', requestValidation, auth, getUsers);

router.get('/users/me', requestValidation, auth, getUser);

router.patch('/users/me', requestValidation, auth, updateUser);

router.patch('/users/me/avatar', requestValidation, auth, updateAvatar);

router.post('/users/signin', login);

router.post('/users/signup', createUser);

module.exports = router;
