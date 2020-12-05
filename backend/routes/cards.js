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
const { tokenValidation, urlValidation } = require('../middlewares/request-validation');

router.get('/cards', celebrate({
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }),
}), auth, getCards);

router.post('/cards', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2),
        link: Joi.string().custom(urlValidation).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }),
}), auth, createCard);

router.delete('/cards/:cardId', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }),
}), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }),
}), auth, likeCard);

router.delete('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }),
}), auth, dislikeCard);

module.exports = router;
