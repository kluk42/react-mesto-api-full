const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const userInfo = await User.find({});
        return res.send(userInfo);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) return res.status(400).send({ message: 'Неверный id' });
        if (err instanceof mongoose.Error.ValidationError) return res.status(400).send({ message: 'Введена неверная ссылка' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: 'Неверный id' });
        const requestedUser = await User.findById(req.params.id);
        if (!requestedUser) return res.status(404).send({ message: 'Нет пользователя с таким id' });
        return res.send(requestedUser);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) return res.status(404).send({ message: 'Пользователь с таким id не найден' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, about, avatar } = req.body;
        const user = await User.create({ name, about, avatar });
        return res.send(user);
    } catch (err) {
        console.log(err.name);
        if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильно заполнен запрос' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, about } = req.body;
        const opts = { runValidators: true, new: true };
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, about }, opts);
        if (!updatedUser) return res.status(404).send({ message: 'Профиль не найден' });
        return res.status(200).send(updatedUser);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) return res.status(400).send({ message: 'Введены некорректные данные' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        const opts = { runValidators: true };
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, opts);
        if (!updatedUser) return res.status(404).send({ message: 'Профиль не найден' });
        return res.status(200).send(updatedUser);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) return res.status(400).send({ message: 'Введены некорректные данные' });
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateAvatar,
};
