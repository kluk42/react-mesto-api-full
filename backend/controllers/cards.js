const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const WrongRequestErr = require('../errors/wrong-request-err');
const UnathorizedActionErr = require('../errors/unathorized-action-err');

const getCards = async (req, res, next) => {
    try {
        const cards = await Card.find({});
        return res.status(200).send(cards);
    } catch (err) {
        return next(err);
    }
};

const createCard = async (req, res, next) => {
    try {
        const owner = req.user;
        const card = await Card.create({ owner, ...req.body })
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    throw new WrongRequestErr('Неправильно заполнен запрос');
                } else {
                    throw err;
                }
            });
        return res.status(200).send(card);
    } catch (err) {
        return next(err);
    }
};

const deleteCard = async (req, res, next) => {
    try {
        const cardToDelete = await Card.findById(req.params.cardId)
            .orFail(new NotFoundErr('Карточка не найдена'));
        if (cardToDelete.owner.toString() !== req.user._id) throw new UnathorizedActionErr('Руки прочь');
        if (!cardToDelete) ;
        const deletedCard = await Card.findByIdAndRemove(req.params.cardId);
        return res.status(200).send(deletedCard);
    } catch (err) {
        return next(err);
    }
};

const likeCard = async (req, res, next) => {
    try {
        const { cardId } = req.params;
        let likedCard = await Card.findByIdAndUpdate(
            cardId,
            { $addToSet: { likes: req.user } },
            { new: true },
        )
            .orFail(new NotFoundErr('Карточка не найдена'));
        likedCard = await Card.findById(cardId);
        return res.status(200).send(likedCard);
    } catch (err) {
        return next(err);
    }
};

const dislikeCard = async (req, res, next) => {
    try {
        const { cardId } = req.params;
        let disLikedCard = await Card.findByIdAndUpdate(
            cardId,
            { $pull: { likes: req.user._id } },
            { new: true },
        )
            .orFail(new NotFoundErr('Карточка не найдена'));
        disLikedCard = await Card.findById(cardId);
        return res.status(200).send(disLikedCard);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
};
