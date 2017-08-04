import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';
import helper from '../helpermethods/AuthenticationHelper';

let router = Express.Router();

router.route('/auth/login')
		.post(function(req, res) {

			Model.User
			 .findOne({
			  	where: { Username: req.body.username },
			  	attributes: ['GUID', 'Username', 'Password', 'Salt']
			  })
			  .then(function(result) {
			  	let hash = helper.hashPasswordWithSalt(req.body.password, result.Salt);
			  	if(hash==result.Password) res.sendStatus(200);
			  	else res.sendStatus(401);
			  })
			  .catch((err) => {
				  	res.sendStatus(400);
				})

		});

module.exports = router;