const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnathorizedActionErr = require('../errors/unathorized-action-err.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Жак-Ив Кусто',
        minlength: 2,
        maxlength: 30,
    },
    about: {
        type: String,
        default: 'Исследователь океана',
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
        default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        validate: {
            validator(v) {
                const regEx = /^https?:\/\/(www\.)?[\w-.~:/?#[\]@!$&'\\*+,;=]+#?$/gm;
                return regEx.test(v);
            },
            message: 'неправильная ссылка',
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: 'Неверный email',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) throw (new UnathorizedActionErr('Неправильные почта или пароль!'));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw (new UnathorizedActionErr('Неправильный пароль'));
    return user;
};

module.exports = mongoose.model('user', userSchema);
