const http = require('http');
const app =  require('./app');
const port = process.env.PORT ;
const server = http.createServer(app);
server.listen(port,function(){
	console.log("server is Configured on PORT " + port);
});
