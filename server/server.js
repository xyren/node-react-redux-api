var bodyParser = require('body-parser')

var express = require('express')
var cors = require('cors')
var app = express()
const Person = require("./queries");
const personnel = new Person();


const PORT = 4000

let personData = '';

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
	res.header("Access-Control-Allow-Methods", "GET, PUT");
	next();
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/person/:id', cors(), function (req, res, next) {
	let server = async () => {
		personData = await personnel.readPerson(req.params.id);
		res.json(personData);
	}
	server();
})

app.get('/person-list', cors(), function (req, res, next) {
	let server = async () => {
		console.log('List Request');
		personData = await personnel.readPersons();
		res.json(personData);
	}
	server();
})

app.put('/person/add/', cors(), function (req, res, next) {
	let server = async () => {
		console.log('Add Request');
		console.log(req.body);
		personData = await personnel.savePerson({
			firstname: req.body.fname,
			lastname: req.body.lname,
			contact_no: req.body.contact
		});
		res.json(personData);
	}
	server();
})

app.put('/person/edit/:id', cors(), function (req, res, next) {
	let server = async () => {
		console.log('Edit Request');
		console.log('ID:', req.params);
		console.log(req.body);
		personData = await personnel.updatePerson({
			firstname: req.body.fname,
			lastname: req.body.lname,
			contact_no: req.body.contact,
			id: req.params.id
		});
		res.json(personData);
	}
	server();
})

app.put('/person/delete/', cors(), function (req, res, next) {
	let server = async () => {
		console.log('Delete Request');
		console.log('ID:', req.body);
		personData = await personnel.deletePerson(req.body.userId);
		res.json(personData);
	}
	server();
})

app.listen(PORT, function () {
  console.log('Web server listening on port '+PORT)
})


