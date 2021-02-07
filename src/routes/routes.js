const express = require('express');
const controller = require('../controller/indexController');
const routes = express.Router();

routes.get('/full', controller.full);
routes.get('/allOrders', controller.allOrders);

module.exports = routes;