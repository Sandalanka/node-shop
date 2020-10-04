const express =require('express');
const route   =express.Router();
const mongoose =require('mongoose');
const User   =require('../model/user');
const bcrypt =require('bcrypt');
const jwt    =require('jsonwebtoken');
const userController=require('../Controller/user');
const checkAuth =require('../middleware/check-auth');

//route define
route.post('/signup',userController.signup);
route.delete('/:userId',checkAuth,userController.user_delete);
route.post('/login',userController.login);




module.exports =route;