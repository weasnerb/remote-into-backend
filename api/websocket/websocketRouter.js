const express = require('express');
const router = express.Router();

const {loginRequired} = require('../auth/authController')
const {websocketHandler} = require('./websocketController');

router.ws('/:computerId', loginRequired, websocketHandler);

module.exports = router;