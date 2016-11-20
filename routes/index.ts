/// <reference path="../typings/tsd.d.ts"/>
import {Request, Response} from "express";

import {App} from "../app/models/App";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
    res.render('index', { title: 'Express' });
    let app = new App();
});

module.exports = router;
