const mongoose = require('mongoose')
require('dotenv').config()
function mongooseConnection() {
    mongoose.set('strictQuery', true)
    mongoose.connect("mongodb://127.0.0.1:27017/HospitalToken");
}
module.exports = {
    mongooseConnection
}