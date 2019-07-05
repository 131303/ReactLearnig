const http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //引入body-parser用于解析post的body

app.use(bodyParser.json());//使用body-parser用于解析post的body
app.use(bodyParser.urlencoded({extended:true}));

app.all('*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", '3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
}); //解决跨域问题

app.use(express.static('public'));

app.post('/password', function(req, res){
	let data = req.body; //解析body中的信息
	console.log(data);
	let message1 = {success:true}
	let message2 = {success:false}
	if(data.user === 'test' && data.password === '123') {
		res.send(message1);
	} else {
		res.send(message2);
	}
});

app.get('/', function(req, res) {
	res.send('This is test message!');
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})