const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.status(200).send(cards);
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const createCard = async (req, res) => {
    try {
        const owner = req.user._id;
        const card = await Card.create({ owner, ...req.body });
        return res.status(200).send(card);
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильно заполнен запрос' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const deleteCard = async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndRemove(req.params.cardId);
        if (!deletedCard) return res.status(404).send({ message: 'Карточка не найдена' });
        return res.status(200).send(deletedCard);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) return res.status(400).send({ message: 'Неправильно заполнен запрос' });
        if (err instanceof mongoose.Error.CastError) return res.status(400).send({ message: 'Карточки с таким id нет' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const likeCard = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) return res.status(400).send({ message: 'Неверный id' });
        const { cardId } = req.params;
        let likedCard = await Card.findById(cardId);
        if (!likedCard) return res.status(404).send({ message: 'Карточка не найдена' });
        likedCard = await Card.findByIdAndUpdate(
            cardId,
            { $addToSet: { likes: req.user._id } },
            { new: true },
        );
        likedCard = await Card.findById(cardId);
        return res.status(200).send({ likes: likedCard.likes });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) return res.status(400).send({ message: 'Неверный id' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const dislikeCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        let disLikedCard = await Card.findById(cardId);
        if (!mongoose.Types.ObjectId.isValid(cardId)) return res.status(400).send({ message: 'Неверный id' });
        if (!disLikedCard) return res.status(404).send({ message: 'Карточка не найдена' });
        disLikedCard = await Card.findByIdAndUpdate(
            cardId,
            { $pull: { likes: req.user._id } },
            { new: true },
        );
        disLikedCard = await Card.findById(cardId);
        return res.status(200).send({ likes: disLikedCard.likes });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) return res.status(400).send({ message: 'Неверный id' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
};
