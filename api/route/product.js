const express =require('express');
const route   =express.Router();
const Product=require('../model/product');
const mongoose =require('mongoose');
const checkAuth =require('../middleware/check-auth');
const productController =require('../Controller/product')

//route define
route.get('/',productController.get_all_product);
route.post('/',checkAuth,productController.product_add);
route.get('/:productId',productController.one_product_get);
route.patch('/:productId',checkAuth,productController.product_update);
route.delete('/:productId',checkAuth,productController.product_delete);


module.exports =route;