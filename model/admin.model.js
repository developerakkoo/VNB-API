const mongoose = require ('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email:{
        type : String,
        require: true
    },
    password:{
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
    
    module.exports = mongoose.model("Admin",AdminSchema);