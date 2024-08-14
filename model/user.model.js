const mongoose = require ('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type : String,
        require: true
    },
    email:{
        type : String,
        require: true
    },
    phoneNumber:{
        type : String,
        require: true
    },
    address:{
        type : String,
        require: true
    },
    pinCode:{
        type : String,
        require: true
    },
    createdAt:{
        type : String,
        default: moment().format('LLLL')
    },
    updatedAt: {
        type: String,
        default: moment().format('LLLL')
    }
    });
    
    module.exports = mongoose.model("user",userSchema);