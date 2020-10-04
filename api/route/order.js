const express =require('express');
const route   =express.Router();
const mongoose =require('mongoose');
const Order =require('../model/order');
const Product =require('../model/product');
const checkAuth =require('../middleware/check-auth');
const orderController =require('../Controller/order');

//route define
route.get('/',checkAuth,orderController.all_order_get);
route.post('/',checkAuth,orderController.order_add);
route.get('/:OrderId',checkAuth,orderController.one_order_get);
route.patch('/:OrderId',checkAuth,orderController.order_update);
route.delete('/:orderId',checkAuth,orderController.order_delete)


module.exports =route;