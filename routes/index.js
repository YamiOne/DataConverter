"use strict";
const App_1 = require("../app/models/App");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
    let app = new App_1.App();
});
module.exports = router;
