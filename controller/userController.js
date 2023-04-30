const User = require('../model/userModel');

module.exports = {


    loadSignup: async (req, res) => {
        try {
            res.render('../views/user/signup');
        } catch (error) {
            console.log(error);
        }
    },

    loadLogin: async (req, res) => {
        try {
            res.render('../views/user/login.ejs')
        } catch (error) {
            console.log(error);
        }
    },

    addUser: async (req, res) => {
        try {
            const { username, password, phone } = req.body;
            const userName = username.toLowerCase();
            const existingUserName = await User.findOne({ userName: userName });
            if (existingUserName) {
                res.json({ status: false, err: "username" });
            } else {
                const existingPhone = await User.findOne({ phone: phone });
                if (existingPhone) {
                    res.json({ status: false, err: "phone" });
                } else {
                    const newUser = new User({
                        userName: userName,
                        phone:phone,
                        password:password
                    })
                    await newUser.save();
                    res.json({ status: true })
                }
            }
        } catch (error) {
            console.log(error + "deeeeeeeeeeee");
        }
    }


}