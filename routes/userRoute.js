const express = require('express');
const path = require('path');
const userRoute =  express();
const Usercontroller = require('../controller/userController');
const authentication = require('../middleware/userAuth');
const checkBlocked = require('../middleware/userBlocked');
const isLogin = authentication.isLogout;
const isLogout = authentication.isLogin;
const isBlocked = checkBlocked.isBlocked;


userRoute.get('/login',isLogin,Usercontroller.loadLogin);

userRoute.post('/login', isLogin, Usercontroller.loadLogin);

userRoute.get('/signup',isLogin,Usercontroller.loadSignup);

userRoute.post('/register', isLogin, Usercontroller.addUser);




module.exports = userRoute;