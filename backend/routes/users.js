const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { urlValidation } = require('../middlewares/request-validation');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
}), auth, getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    about: Joi.string().min(2),
  }),
}), auth, updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidation).required(),
  }),
}), auth, updateAvatar);

module.exports = router;
