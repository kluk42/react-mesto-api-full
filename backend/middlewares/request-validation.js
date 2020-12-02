const mongoose = require('mongoose');
const WrongRequestErr = require('../errors/wrong-request-err');

module.exports = (req, res, next) => {
    const { id, cardId } = req.params;
    const { authorization } = req.headers;

    if (((!mongoose.Types.ObjectId.isValid(id)) && (id !== undefined))) {
        const idErr = new WrongRequestErr('Неверный id');
        return next(idErr);
    }

    if (((!mongoose.Types.ObjectId.isValid(cardId)) && (cardId !== undefined))) {
        const idErr = new WrongRequestErr('Неверный id карточки');
        return next(idErr);
    }

    if ((authorization !== undefined) && (!authorization.startsWith('Bearer '))) {
        const tokenErr = new WrongRequestErr('В authorization отсутствует Bearer');
        next(tokenErr);
    }

    if (!authorization) {
        const tokenErr = new WrongRequestErr('Требуется авторизация');
        next(tokenErr);
    }

    return next();
};
