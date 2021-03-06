const express  = require('express');
const router  = express.Router();
const Volunteer = require('../Models/VolunteerSchema');
const Location = require("../Models/locationSchema");
const mongoose = require('mongoose');
const Event = require("../Models/eventsSchema");

router.get('/',(req,res,next)=>{
	res.status(200).json({
		message:'Handling Get Request to /volunteerRoutes'
	});
});

router.post('/signUp',(req,res,next)=>{
	
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


		const volunteer = new Volunteer({
			_id: new mongoose.Types.ObjectId(),
			Username:req.body.Username,
			Password : req.body.Password,
			Name:req.body.Name, 		
			StartTime :req.body.StartTime,
			EndTime : req.body.EndTime,
			StartDate : req.body.StartDate,
			EndDate : req.body.EndDate
		});
		volunteer.Location.push(result._id);
		volunteer.save()
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


router.post('/login',(req,res,next)=>{

	Volunteer.find({Username: req.body.Username}, function(err, user){

		if(err){

			res.status(404).json({

				error:err

			});

		}

		else{
				if(user.Password == req.body.Password){

					res.status(200).json({
						location_id:user.Location,
						username:true,
						password : true
					})

				}
				else{
					res.status(201).json({
						username : true,
						passwrod:false
					})
				}
		}
})

});

router.get('/:Id',function(req,res,next){
	const locationId = req.params.Id;
	var events = []
	Location.find({_id:locationId}, function(err, user){
	
	Location.find({PostalCode:user[0].PostalCode}, function(err,loc) { 
    
	    loc.forEach((loc)=>{
			Event.find({Location:loc},async function(err,eventss){
	
				if(err){
					res.status(404).json({
						error:err
					})
				}

				else{
			
					await eventss.forEach((event)=>{
					events.push(event)
				});

				res.status(200).json({
					nearByEvents:events
				});
			}
		});
	});
});

});

})
module.exports = router;