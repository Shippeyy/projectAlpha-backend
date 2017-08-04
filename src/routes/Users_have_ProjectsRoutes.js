import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import logger from '../winston';
import config from '../config/config';

let router = Express.Router();

router.route('/users_have_projects')
		.post(function(req, res) {

			Model.Users_have_Projects
			  .build({
			  	UserGUID: req.body.userguid,
				ProjectGUID: req.body.projectguid,
				PermissionlevelGUID: req.body.permissionlevelguid,
				Public: req.body.public
			  })
			  .save()
			  .then(function(result) {
			  	logger.log(config.log.level, 'ROUTE CALLED: /users_have_projects; RESULT: ' + result);
			  	res.send(result);
			  })
			  .catch((err) => {
			  	logger.log(config.log.level, 'ROUTE CALLED: /users_have_projects; RESULT: 400');
				res.sendStatus(400);
			  })
		})

		.get(function(req, res) {
			try{
				Model.Users_have_Projects.findAll()
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /users_have_projects; RESULT: ' + result);
					res.send(result);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});

router.route('/showUserProjects')
		.post(function(req, res) {
			try{
				Model.Users_have_Projects.findAll({
					where: {
						UserGUID: req.body.userguid
					}
				})
				.then(function(result) {
					if(typeof req.session.userguid !== 'undefined' && req.session.userguid !== null){
						if(req.session.userguid == result.GUID) {
							logger.log(config.log.level, 'ROUTE CALLED: /showUserProjects; RESULT: ' + result);
							res.send(result);
						}
					}
					else {
						if(result.Public == true) {
							logger.log(config.log.level, 'ROUTE CALLED: /showUserProjects; RESULT: ' + result);
							res.send(result);
						}
						else{
							logger.log(config.log.level, 'ROUTE CALLED: /showUserProjects; RESULT: 401');
							res.sendStatus(401);
						}
					}

				}).catch((err) => {
					logger.log(config.log.level, 'ROUTE CALLED: /showUserProjects; RESULT: 400');
				  	res.sendStatus(400);
				})
			}
			catch(error) {
				res.send(error);
			}
			
		});
module.exports = router;