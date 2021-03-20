const express = require("express");
const router = express.Router();

const { makePayment } = require("../controllers/stripe");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.put("/stripe/payment", isSignedIn, isAuthenticated, makePayment);

module.exports = router;
