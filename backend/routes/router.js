const router = require('express').Router();
const userRoutes = require('./users.js');
const cardsRoutes = require('./cards');

router.use(userRoutes);
router.use(cardsRoutes);

module.exports = router;
