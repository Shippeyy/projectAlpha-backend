import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

//POST URL: localhost:8080/api/user?username=testusername&email=testemail&password=testpassword&api_key=testapikey&api_secret=testapisecret
router.route('/users_have_projects')
		.post(function(req, res) {

			Model.Users_have_Projects
			  .build({
			  	UserGUID: req.body.userguid,
				ProjectGUID: req.body.projectguid,
				PermissionlevelGUID: req.body.permissionlevelguid
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
				Model.Users_have_Projects.findAll()
				.then(function(result) {
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

module.exports = router;