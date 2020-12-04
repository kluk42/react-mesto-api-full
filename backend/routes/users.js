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
const { urlValidation, tokenValidation } = require('../middlewares/request-validation');

router.get('/users', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, getUsers);

router.get('/users/me', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, getMe);

router.get('/users/:userId', celebrate({
    params: Joi.object().keys({
        userId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, getUser);

router.patch('/users/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2),
        about: Joi.string().min(2),
    }).unknown(true),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, updateUser);

router.patch('/users/me/avatar', celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().custom(urlValidation).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, updateAvatar);

router.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), login);

router.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().min(2),
        about: Joi.string().min(2),
        avatar: Joi.string().custom(urlValidation),
    }),
}), createUser);

module.exports = router;
