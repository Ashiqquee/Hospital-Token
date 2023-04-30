const User = require('../model/userModel')

const isBlocked = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            const userData = await User.findOne({ _id: req.session.userId });
            if (userData.isBlocked === 1) {
                req.session.userId = null;
            }
            next()
        } else {
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    isBlocked
}