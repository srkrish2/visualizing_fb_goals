const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    uid: {
        type: String
    },
    email:{
        type: String,
        default: ''
    },
    mturkid:{
        type: String,
        default: ''
    },
    exp_cond:{
        type: String,
        default: ''
    },
    pageIdx: {
    	type: Number,
        default: 0
    },
    rejected: {
        type: Boolean,
        default: false
    },
    consent: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User', User);