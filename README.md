node-faceplusplus
=================

a node client of faceplusplus.com

## Usage

### initialize

var FacePlusPlus = require('faceplusplus');
var client = new SDK('{{api_key}}', '{{api_secret}}');

### basic get/post method

client.post('person/create', {person_name : 'Somebody'}, function(err, response, body){
	console.log(body);
});

### multipart post method

var data = {
	img : {
		value: fs.readFileSync('./a.jpg'), 
		meta: {filename:'a.jpg'}
	}
};
client.postMulti('detection/detect', data, function(err, response, body){
	console.log(body);
});


