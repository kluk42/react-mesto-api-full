const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
    getUsers,
    getUser,
    getMe,
    createUser,
    updateUser,
    updateAvatar,
    login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const requestValidation = require('../middlewares/request-validation');

router.get('/users', requestValidation, auth, getUsers);

router.get('/users/me', requestValidation, auth, getMe);

router.get('/users/:userId', requestValidation, auth, getUser);

router.patch('/users/me', requestValidation, auth, updateUser);

router.patch('/users/me/avatar', requestValidation, auth, updateAvatar);

router.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }).unknown(true),
    headers: Joi.object().keys({
        authorization: Joi.string().required(),
    }),
}), login);

router.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }).unknown(true),
}), createUser);

module.exports = router;
