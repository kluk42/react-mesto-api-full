const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/router.js');
const errorsCentral = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');

const { PORT = 5000 } = process.env;
const app = express();
app.use(cors());
app.set('trust proxy', 1);
app.use(limiter);
app.use(helmet());

const { mongodbUrl = 'mongodb://localhost:27017/mydb' } = process.env;
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

app.use(errors());

app.use((err, req, res, next) => {
  errorsCentral(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
