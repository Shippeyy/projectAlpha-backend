import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

//POST URL: localhost:8080/api/user?username=testusername&email=testemail&password=testpassword&api_key=testapikey&api_secret=testapisecret
router.route('/permissionlevel')
		.post(function(req, res) {

			Model.Permissionlevel
			  .build({
			  	Level: req.body.level,
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
				Model.Permissionlevel.findAll()
				.then(function(result) {
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

module.exports = router;