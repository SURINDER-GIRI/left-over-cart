const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

	const LocationSchema = new mongoose.Schema({
	_id:{type:ObjectId,required:true},
	Street_name: {type: String,required:true},
	City: {type: String ,require:true},
	PostalCode : {type : String, required: true},
	Province: {type: String ,required:true},
	Country:{ type: String,required : true}


});
module.exports = mongoose.model('Location',LocationSchema);