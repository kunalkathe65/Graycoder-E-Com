const express = require('express');
const router = express.Router();

const { makePayment } = require('../controllers/stripe');

router.post('/stripe/payment', makePayment);

module.exports = router;
