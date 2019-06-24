
const mongoose = require('mongoose');
const Location = require('./locationSchema');
const Volunteer = require('./VolunteerSchema');
const FoodDonor = require('./FoodDonorSchema');
var Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;
const foodDonorSchema = new mongoose.Schema({

		_id:{type:ObjectId,required:true},
		Username:{type: String,required :true ,index: {Unioque: true}},
		Password : {type: String},
		Name:{type: String,required:true},
		Contact:{ type : String }
		
});
module.exports = mongoose.model('FoodDonor',foodDonorSchema);