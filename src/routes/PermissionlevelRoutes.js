import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import logger from '../winston';
import config from '../config/config';

let router = Express.Router();

router.route('/permissionlevel')
		.post(function(req, res) {

			Model.Permissionlevel
			  .build({
			  	Level: req.body.level,
				Description: req.body.description
			  })
			  .save()
			  .then(function(result) {
			  	logger.log(config.log.level, 'ROUTE CALLED: /permissionlevel; RESULT: ' + result);
			  	res.send(result);
			  })
			  .catch((err) => {
			  		logger.log(config.log.level, 'ROUTE CALLED: /permissionlevel; RESULT: 400');
				  	res.sendStatus(400);
				})

		})

		.get(function(req, res) {
			try{
				Model.Permissionlevel.findAll()
				.then(function(result) {
					logger.log(config.log.level, 'ROUTE CALLED: /permissionlevel; RESULT: ' + result);
					res.send(result);
				})
			}
			catch(error) {
				logger.log(config.log.level, 'ROUTE CALLED: /permissionlevel; RESULT: ' + error);
				res.send(error);
			}
			
		});

module.exports = router;