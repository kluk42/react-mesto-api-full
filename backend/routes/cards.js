const router = require('express').Router();
const {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const requestValidation = require('../middlewares/request-validation');

router.get('/cards', requestValidation, auth, getCards);
router.post('/cards', requestValidation, auth, createCard);
router.delete('/cards/:cardId', requestValidation, auth, deleteCard);
router.put('/cards/:cardId/likes', requestValidation, auth, likeCard);
router.delete('/cards/:cardId/likes', requestValidation, auth, dislikeCard);

module.exports = router;
