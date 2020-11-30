const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router.js');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use(errorLogger);

app.use((req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
    errors(err, req, res, next);
    next();
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
});
