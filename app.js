const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router.js');

const { PORT = 3000 } = process.env;
const app = express();

const mongodbUrl = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    req.user = {
        _id: '5f9baabae11b1524d006bbe3',
    };

    next();
});

app.use('/', router);

app.use((req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
});
