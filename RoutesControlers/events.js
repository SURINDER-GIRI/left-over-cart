const express  = require('express');
const router  = express.Router();

const Volunteer = require('../Models/VolunteerSchema');
const Location = require("../Models/locationSchema");
const mongoose = require('mongoose');
const Events = require("../Models/eventsSchema");

router.post('/create',(req,res,next)=>{
	
	const location = new Location({
		_id: new mongoose.Types.ObjectId(),
		Street_name: req.body.Street_name,
		City: req.body.City,
		PostalCode : req.body.PostalCode,
		Province: req.body.Province,
		Country:req.body.Country
	});
	location.save()
	.then(result =>{

		const event = new Events({
			_id: new mongoose.Types.ObjectId(),
			Name:req.body.Name, 		
			StartTime :req.body.StartTime,
			EndTime : req.body.EndTime,
			StartDate : req.body.StartDate,
			EndDate : req.body.EndDate,
			Location:result._id,
			CreatedBy:req.body.CreatedBy
		})
	
		event.save()
		.then(resultt=>{

			res.status(200).json({
				result:resultt
			})
		})
		.catch(eror =>{
			res.status(404).json({
				errorr:eror,
				block:"inside"
			})
		})

	})
	.catch(err=>{

			res.status(404).json({
				error : err
			});
	});
	});

router.post('/pastEvents',async function(req,res,next){
	var ate =  new Date().toISOString();

	date = new Date(ate);
	date = date.getDate() +'/' + (date.getMonth()+1) + '/' +date.getFullYear();

	Events.find({ StartDate: { $lte: date } }).exec((err, fields) => {
		res.status(200).json({

			events: fields

		});
  });
}); 


router.get('/description/:Id',function(req,res,next){

	const eventId = req.params.Id;
	Events.find({_id:eventId},function(err, event){

		if(err){
			res.status(404).json({
				error:err
			});
		}

		else{

			res.status(200).json({
				event:event[0]
			});
		}
	})

});


module.exports = router;