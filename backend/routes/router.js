const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users.js');
const cardsRoutes = require('./cards');
const { urlValidation } = require('../middlewares/request-validation');
const { createUser, login } = require('../controllers/users');

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
    password: Joi.string().required().min(6),
    name: Joi.string().min(2),
    about: Joi.string().min(2),
    avatar: Joi.string().custom(urlValidation),
  }),
}), createUser);

router.use(userRoutes);
router.use(cardsRoutes);

module.exports = router;
