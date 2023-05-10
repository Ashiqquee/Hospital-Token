const mongoose =  require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true
    },
    hospitalImage : {
        type:Array,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    listed : {
        type:Boolean,
        default:true,
    }
});

const Hospital = mongoose.model("Hospital",hospitalSchema);

module.exports = Hospital;