import Express from 'express';
import Model from '../models/model';
import Utils from '../utils';

let router = Express.Router();

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
			  .catch((err) => {
				  res.sendStatus(400);
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

router.route('/showUserProjects')
		.post(function(req, res) {
			try{
				Model.Users_have_Projects.findAll({
					where: {
						UserGUID: req.body.userguid
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