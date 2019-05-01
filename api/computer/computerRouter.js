const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    computerController = require('./computerController');


router.post('/', authController.loginRequired, computerController.addComputer);

router.get('/', authController.loginRequired, computerController.getUsersComputers);

module.exports = router;