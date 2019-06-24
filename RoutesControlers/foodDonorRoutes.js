const express  = require('express');
const router  = express.Router();
const eventSchema = require('../Models/eventsSchema');
const mongoose = require('mongoose');
const FoodDonor = require('../Models/FoodDonorSchema');
									 
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

router.get('/',(req,res,next)=>{

	res.status(200).json({
		message:'Handling Get Request to /FoodDonor'
	});
});

router.post('/signUp',(req,res,next)=>{

	const foodDonor = new FoodDonor({
		_id:new mongoose.Types.ObjectId(),
		Username:req.body.Username,
		Password : req.body.Password,
		Name:req.body.Name,
		Contact:req.body.Contact
		
	});

	foodDonor.save()
	.then(result =>{
		res.status(200).json({
			savedData : result
		})
	
		})

		.catch(err=>{
			res.status(404).json({
				error : err
			});
	})

});

router.post('/login',(req,res,next)=>{

	FoodDonor.find({Username : req.body.Username}, function(err, user){
		
		if(err){

			res.status(404).json({

				error:err

			});

		}

		else{

				if(user[0].Password == req.body.Password){

					res.status(200).json({
						credentials:user[0],
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

router.post('/home',(req,res,next)=>{

	eventSchema.find({CreatedBy: req.body._id},function(err,event){


		if(err){
			res.status(404).json({
				"error" : err
			});
		}

		else{

			res.status(200).json({
			events : event
		
		});
		}
	});

})

module.exports = router;