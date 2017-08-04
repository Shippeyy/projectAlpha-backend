import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import logger from '../winston';
import config from '../config/config';

let router = Express.Router();

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
			  	logger.log(config.log.level, 'ROUTE CALLED: /project; RESULT: ' + result);
			  	res.send(result);
			  })
			  .catch((err) => {
			  	logger.log(config.log.level, 'ROUTE CALLED: /project; RESULT: 400');
				res.sendStatus(400);
			  })

		})

		.get(function(req, res) {
			try{
				Model.Project.findAll()
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /project; RESULT: ' + result);
					res.send(result);
				})
			}
			catch(error) {
				logger.log(config.log.level, 'ROUTE CALLED: /project; RESULT: ' + error);
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
					logger.log(config.log.level, 'ROUTE CALLED: /showProjectDetails; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /showProjectDetails; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/showEditableProjectFields')
		.post(function(req, res) {
			try{
				Model.Project.findOne({
					where: {
						GUID: req.body.projectguid
					},
					attributes: ['Title', 'Gitlink', 'Description']
				})
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /showEditableProjectFields; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /showEditableProjectFields; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/editProject')
		.post(function(req, res) {
			try{
				Model.Project.update({
					Title: req.body.title,
					Gitlink: req.body.gitlink,
					Description: req.body.description
				},
				{
					where: {
						GUID: req.body.projectguid
					}
				})
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /editProject; RESULT: ' + result);
					res.send(result);
				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /editProject; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

module.exports = router;