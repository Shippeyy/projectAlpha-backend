import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

//POST URL: localhost:8080/api/user?username=testusername&email=testemail&password=testpassword&api_key=testapikey&api_secret=testapisecret
router.route('/user')
		.post(function(req, res) {

			Model.User
			  .build({
			  	Username: req.body.username,
				Firstname: req.body.firstname,
				Lastname: req.body.lastname,
				Email: req.body.email,
				AccountCreation_Timestamp: new Date().getTime(),
				Description: req.body.description
			  })
			  .save()
			  .then(function(result) {
			  	res.send(result);
			  })
			  .catch(function(error) {
			  	console.log(error);
			  	res.send(error);
			  })

		})

		.get(function(req, res) {
			try{
				Model.User.findAll()
				.then(function(result) {
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/showEditableUserFields')
		.post(function(req, res) {
			try{
				Model.User.findOne({
					where: {
						GUID: req.body.userguid
					},
					attributes: ['Username', 'Firstname', 'Lastname', 'Email', 'Email_verified', 'Description']
				})
				.then(function(result) {
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

module.exports = router;