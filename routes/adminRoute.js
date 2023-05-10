const express = require('express');
const adminRoute = express();
const adminController = require('../controller/adminController');
const hospitalController = require('../controller/hospotalController');
const authentication = require('../middleware/adminAuth');
const isLogout = authentication.isLogout;
const isLogin = authentication.isLogin;
const multer = require('../config/multer');
const upload = multer.createMulter();

adminRoute.get('',isLogout,adminController.loadLogin);

adminRoute.post('/',isLogout,adminController.verifyLogin)

adminRoute.get('/home', isLogin, adminController.loadHome);

adminRoute.get('/addHospital', isLogin, hospitalController.loadAddHospital);

adminRoute.post("/addHospital", upload.array("file", 5), isLogin, hospitalController.insertHospital);

module.exports = adminRoute;