const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Goal = new Schema({
	uid: {
        type: String
    },
    goalType:{
        type: String,
        default: ''
    },
    goalText:{
        type: String,
        default: ''
    },
    goalArea:{
    	type: Number,
    	default: 0
    },
    goalTime: {
    	type: Number,
    	default: 0
    },
    goalQuality: {
    	type: Number,
    	default: 0
    },
    goalReqs:{
    	type: [String],
    	default:undefined 
    }
})

module.exports = mongoose.model('Goal', Goal);