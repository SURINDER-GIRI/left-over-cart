const mongoose = require('mongoose');
const Events = require('./eventsSchema');
const Location = require('./locationSchema');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const volunteerSchema = new mongoose.Schema({
	_id:{type:ObjectId,required:true},
	Username:{type: String},
	Password : {type: String},
	Name:{type: String},
	Location :[{type: Schema.Types.ObjectId, ref: 'Location'}], 		
	StartTime : {type:String},
	EndTime : {type:String},
	StartDate : {type:String},
	EndDate : {type:String}


});
module.exports = mongoose.model('Volunteer',volunteerSchema);