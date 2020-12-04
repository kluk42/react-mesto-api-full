const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const router = require('./routes/router.js');
const errorsCentral = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { urlValidation } = require('./middlewares/request-validation');
const { createUser, login } = require('./controllers/users');

const { PORT = 5000 } = process.env;
const app = express();
app.use(cors());

const mongodbUrl = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use('/', router);

app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});

app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), login);

app.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().min(2),
        about: Joi.string().min(2),
        avatar: Joi.string().custom(urlValidation),
    }),
}), createUser);

app.use(errorLogger);

app.use((req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errors());

app.use((err, req, res, next) => {
    errorsCentral(err, req, res, next);
    next();
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
});
