// Requiring all System Modules

const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//  Requiring all Route files

const volunteerRoutes = require('./RoutesControlers/volunteerRoutes');
const foodDonorRoutes = require('./RoutesControlers/foodDonorRoutes');
const events = require('./RoutesControlers/events');

// Requiring Database

mongoose.connect('mongodb+srv://Admin:'+'hello123'+'@suricluster0-a6asi.azure.mongodb.net/test?retryWrites=true&w=majority');

//Making Logs
app.use(morgan('dev'));

// Parsing all Responses to JSON 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

// Handling CORS Requests
app.use((req,res,next)=>{
res.header("Access-Control-Allow-Origin","*");
res.header(
	"Access-Control-Allow-Headers",'Origin,X-Requested-With,Content-Type,Accept,Authorisation');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
		res.status(200).json({});

	}
	next();
});



//Paths for Defined Routes

app.use("/volunteer",volunteerRoutes);
app.use("/foodDonor",foodDonorRoutes);
app.use("/events",events);

// Error Handling

app.use((req,res,next)=>{
const error = new Error('Not Found');
error.status = 404;
next(error);
});


app.use(function(error,req,res,next){
	res.json({
		message:error.message,
		description:"error handeled by API"
	});
});

module.exports = app;