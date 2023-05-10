const User = require('../model/userModel');
require('dotenv').config({ path: '../../.env' });


module.exports = {


    loadLogin: async (req, res) => {
        try {
            res.render('../views/admin/login.ejs');
        } catch (error) {
            console.log(error);
        }
    },


    verifyLogin: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (username ===process.env.ADMIN) {
                if (password === process.env.PASSWORD) {
                    req.session.adminId = username;
                    res.json({ status: true });
                } else {
                    res.json({ status: false, err: "password" });
                }
            } else {
                res.json({ status: false, err: "user" })
            }
        } catch (error) {
            console.log(error);
        }
    },


    loadHome: async (req, res) => {
        try {
            res.render('../views/admin/home.ejs')
        } catch (error) {
            console.log(error);
        }
    }




}


