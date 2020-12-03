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
    }).unknown(true),
}), auth, getCards);

router.post('/cards', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2),
        link: Joi.string().custom(urlValidation).required(),
    }).unknown(true),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, createCard);

router.delete('/cards/:cardId', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, likeCard);

router.delete('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24).required(),
    }),
    headers: Joi.object().keys({
        authorization: Joi.string().custom(tokenValidation).required(),
    }).unknown(true),
}), auth, dislikeCard);

module.exports = router;
