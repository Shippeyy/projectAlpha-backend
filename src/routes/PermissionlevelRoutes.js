import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

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
			  	res.send(result);
			  })
			  .catch((err) => {
				  	res.sendStatus(400);
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