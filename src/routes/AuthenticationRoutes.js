import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import authenticationHelper from '../helpermethods/AuthenticationHelper';
import logger from '../winston';
import config from '../config/config';

let router = Express.Router();

router.route('/auth/login')
		.post(function(req, res) {

			Model.User
			 .findOne({
			  	where: { Username: req.body.username },
			  	attributes: ['GUID', 'Username', 'Password', 'Salt']
			  })
			  .then(function(result) {
			  	let hash = authenticationHelper.hashPasswordWithSalt(req.body.password, result.Salt);
			  	if(hash==result.Password) {
			  		req.session.userguid = result.GUID;
			  		req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
			  		logger.log(config.log.level, 'ROUTE CALLED: /auth/login; RESULT: 200');
			  		res.sendStatus(200);

			  	}
			  	else {
			  		logger.log(config.log.level, 'ROUTE CALLED: /auth/login; RESULT: 401');
			  		res.sendStatus(401);
			  	}
			  })
			  .catch((err) => {
			  		logger.log(config.log.level, 'ROUTE CALLED: /auth/login; RESULT: 400');
				  	res.sendStatus(400);
				})

		});

router.route('/auth/logout')
		.post(function(req, res) {
			try {
				req.session.destroy(function(result){
					logger.log(config.log.level, 'ROUTE CALLED: /auth/logout; RESULT: 200');
					res.sendStatus(200);
				})
			}
			catch(err) {
				logger.log(config.log.level, 'ROUTE CALLED: /auth/logout; RESULT: 400');
				res.sendStatus(400)
			}
		})


module.exports = router;