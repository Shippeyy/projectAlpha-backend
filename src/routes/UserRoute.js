import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

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
			  .catch((err) => {
				  res.sendStatus(400);
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
				}).catch((err) => {
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/editUser')
		.post(function(req, res) {
			try{
				Model.User.update({
					Username: req.body.username,
					Firstname: req.body.firstname,
					Lastname: req.body.lastname,
					Email: req.body.email,
					Email_verified: req.body.email_verified,
					Description: req.body.description
				},
				{
					where: {
						GUID: req.body.userguid
					}
				})
				.then(function(result) {
					res.send(result);
				}).catch((err) => {
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/verifyEmail')
		.post(function(req, res) {
			try{
				Model.User.update({
					Email_verified: true,
				},
				{
					where: {
						GUID: req.body.userguid
					}
				})
				.then(function(result) {
					res.send(result);
				}).catch((err) => {
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
		});
			

module.exports = router;