const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundErr = require('../errors/not-found-err');
const WrongRequestErr = require('../errors/wrong-request-err');

const User = require('../models/user');

const getUsers = async (req, res, next) => {
    try {
        const userInfo = await User.find({});
        return res.send(userInfo);
    } catch (err) {
        return next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const requestedUser = await User.findById(req.user);
        if (!requestedUser) throw new NotFoundErr('Пользотватель не найден');
        return res.send(requestedUser);
    } catch (err) {
        return next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {
            name, about, avatar, email, password,
        } = req.body;
        const isUniqueEmail = await User.findOne({ email }); // Если не найдёт, то вернёт null
        if (isUniqueEmail) {
            throw new WrongRequestErr('Пользователь с таким адресом уже есть');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            about,
            avatar,
            password: hash,
            email,
        })
            .catch((err) => {
                if (err.name === 'ValidationError') throw new WrongRequestErr('Неправильно заполнен запрос');
                throw err;
            });
        return res.status(200).send(`${user.name}, регистрация прошла успешно. Авторизуйтесь`);
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, about } = req.body;
        const opts = { runValidators: true, new: true };
        const updatedUser = await User.findByIdAndUpdate(req.user, { name, about }, opts)
            .orFail(new NotFoundErr('Такого пользователя нет, зарегистрируйтесь'))
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    throw new WrongRequestErr('Введены некорректные данные');
                } else {
                    throw err;
                }
            });
        return res.status(200).send(updatedUser);
    } catch (err) {
        return next(err);
    }
};

const updateAvatar = async (req, res, next) => {
    try {
        const { avatar } = req.body;
        const opts = { runValidators: true };
        const oldUser = await User.findByIdAndUpdate(req.user, { avatar }, opts)
            .orFail(new NotFoundErr('Такого пользователя нет, зарегистрируйтесь'))
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    throw new WrongRequestErr('Введены некорректные данные');
                } else {
                    throw err;
                }
            });
        const updatedUser = await User.findById(oldUser._id);
        return res.status(200).send(updatedUser);
    } catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const user = await User.findUserByCredentials(email, password);
        const { NODE_ENV, JWT_SECRET } = process.env;
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        return res.status(200).send({ token });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateAvatar,
    login,
};
