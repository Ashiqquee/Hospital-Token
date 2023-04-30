const User = require('../model/userModel');
const bcrypt = require('bcrypt')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to hash password");
    }
};

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
            const bcryptedPassword = await securePassword(password);
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
                        password: bcryptedPassword,
                    })
                    await newUser.save();
                    res.json({ status: true })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, 

    verifyLogin : async(req,res) => {
        try {
            const {username,password} = req.body;
            const userName = username.toLowerCase();
            const existingUser = await User.findOne({userName:userName});
            if(existingUser){
                const passwordMatch = await bcrypt.compare(password, existingUser.password);
                if(passwordMatch){
                    req.session.userId = existingUser._id;
                    console.log(req.session.userId);
                    res.json({status:true});
                } else {
                    res.json({status:false,err:"password"});
                }
            } else {
                res.json({status:false,err:"user"})
            }
        } catch (error) {
           console.log(error); 
        }
    },

    loadHome : async (req,res) => {
        try {
           res.render('../views/user/home.ejs') 
        } catch (error) {
            console.log(error);
        }
    },


}