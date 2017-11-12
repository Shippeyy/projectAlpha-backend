import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import helper from '../helpermethods/AuthenticationHelper';
import logger from '../winston';
import config from '../config/config';

let router = Express.Router();

router.route('/user')
		.post(function(req, res) {

			let credentials = helper.hashPassword(req.body.password);

			Model.User
			  .build({
			  	Username: req.body.username,
			  	Password: credentials.hash,
			  	Salt: credentials.salt,
				Firstname: req.body.firstname,
				Lastname: req.body.lastname,
				Email: req.body.email,
				AccountCreation_Timestamp: new Date().getTime(),
				Description: req.body.description
			  })
			  .save()
			  .then(function(result) {
			  	logger.log(config.log.level, 'ROUTE CALLED: /user; RESULT: ' + result);
			  	res.send(result);
			  })
			  .catch((err) => {
			  	logger.log(config.log.level, 'ROUTE CALLED: /user; RESULT: 400');
				res.sendStatus(400);
			  })

		})

		.get(function(req, res) {
			try{
				Model.User.findAll()
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /user; RESULT: ' + result);
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/updatePassword')
		.post(function(req, res) {
			try{
				if(!req.session.userguid) {
					logger.log(config.log.level, 'ROUTE CALLED: /updatePassword; RESULT: 401');
					res.sendStatus(401);
					return null;
				}
				Model.User.findOne({
					where: {
						GUID: req.session.userguid
					},
					attributes: ['GUID', 'Password', 'Salt']
				})
				.then(function(result) {
					let credentials = helper.hashPassword(req.body.password);
					Model.User.update({
						Password: credentials.hash,
						Salt: credentials.salt
					},{
						where: {
							GUID: result.GUID
						}
					});
					logger.log(config.log.level, 'ROUTE CALLED: /updatePassword; RESULT: 200');
					res.sendStatus(200);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /updatePassword; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/showEditableUserFields')
		.post(function(req, res) {
			try{
				if(!req.session.userguid) {
					logger.log(config.log.level, 'ROUTE CALLED: /showEditableUserFields; RESULT: 401');
					res.sendStatus(401);
					return null;
				}
				Model.User.findOne({
					where: {
						GUID: req.session.userguid
					},
					attributes: ['Username', 'Firstname', 'Lastname', 'Email', 'Email_verified', 'Description']
				})
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /showEditableUserFields; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /showEditableUserFields; RESULT: 400');
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
				if(!req.session.userguid) {
					logger.log(config.log.level, 'ROUTE CALLED: /editUser; RESULT: 401');
					res.sendStatus(401);
					return null;
				}
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
						GUID: req.session.userguid
					}
				})
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /editUser; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /editUser; RESULT: 400');
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
				if(!req.session.userguid) {
					logger.log(config.log.level, 'ROUTE CALLED: /verifyEmail; RESULT: 401');
					res.sendStatus(401);
					return null;
				}
				Model.User.update({
					Email_verified: true,
				},
				{
					where: {
						GUID: req.session.userguid
					}
				})
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /verifyEmail; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /verifyEmail; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
		});

router.route('/getCurrentUser')
		.get(function(req, res) {
			try{
				if(!req.session.userguid) {
					console.log(req.session);
					console.log(req.session.userguid);
					logger.log(config.log.level, 'ROUTE CALLED: /getCurrentUser; RESULT: 401');
					res.sendStatus(401);
				}
				else {
					console.log(req.session.userguid)
					logger.log(config.log.level, 'ROUTE CALLED: /getCurrentUser; RESULT: ' + req.session.userguid);
					res.send(req.session.userguid);
				}	
			}
			catch(error) {
				res.send(error);
			}
		})
		
module.exports = router;