


const express = require('express');
const router = express.Router();


const {login, dashboard} = require('../controller/main');
router.route("/dashboad").get(dashboard);
router.route('/login').post(login);


module.exports = router;