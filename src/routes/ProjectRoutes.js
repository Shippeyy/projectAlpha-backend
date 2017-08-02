import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

//POST URL: localhost:8080/api/user?username=testusername&email=testemail&password=testpassword&api_key=testapikey&api_secret=testapisecret
router.route('/project')
		.post(function(req, res) {

			Model.Project
			  .build({
			  	Title: req.body.title,
				Gitlink: req.body.gitlink,
				ProjectCreation_Timestamp: new Date().getTime(),
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
				Model.Project.findAll()
				.then(function(result) {
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/showProjectDetails')
		.post(function(req, res) {
			try{
				Model.Project.findOne({
					where: {
						GUID: req.body.projectguid
					}
				})
				.then(function(result) {
					console.log(req.body.projectguid);
					res.send(result);
				})
			}
			catch(error) {
				console.log('false');
				console.log(req.body.projectguid);
				res.send(error);
			}
			
		});

module.exports = router;