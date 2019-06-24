const mongoose = require('mongoose');
const Location = require('./locationSchema');
const Volunteer = require('./VolunteerSchema');
const FoodDonor = require('./FoodDonorSchema');
var Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;
    
const eventsSchema = new mongoose.Schema({

_id:{type:ObjectId,required:true},
Location :{type: ObjectId, ref: 'Location',required:true},
Name:{type:String,required:true}, 		
StartTime : {type:String,required:true},
EndTime : {type:String,required:true},
StartDate : {type:String,required:true},
EndDate : {type:String,required:true},
CreatedBy:{type:ObjectId, ref: 'FoodDonor'}	
});
module.exports = mongoose.model('events',eventsSchema);