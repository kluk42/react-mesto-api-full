const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { urlValidation } = require('../middlewares/request-validation');

router.get('/cards', auth, getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    link: Joi.string().custom(urlValidation).required(),
  }),
}), auth, createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), auth, likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), auth, dislikeCard);

module.exports = router;
