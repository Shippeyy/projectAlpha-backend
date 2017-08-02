import Sequelize from 'sequelize';

const Users_have_Projects = function (sequelize){

	let Users_have_Projects = sequelize.define('Users_have_Projects', {
		GUID: {
			type: Sequelize.UUID,
	        primaryKey: true,
	        defaultValue: Sequelize.UUIDV4,
	        field: "GUID"
		},
		UserGUID: {
			type: Sequelize.UUID,
			allowNull: false,
			field: "UserGUID"
		},
		ProjectGUID: {
			type: Sequelize.UUID,
			allowNull: true,
			field: "ProjectGUID"
		},
		PermissionlevelGUID: {
			type: Sequelize.UUID,
			allowNull: true,
			field: "Permissionlevel"
		}
	},
	{
		logging: false,
		timestamps: false,
		freezeTableName: true
	},
	{
		classMethods: {
			associate: function(model){
				Users_have_Projects.hasOne(model.Permissionlevel, {as: 'Permissionlevel'})
			}
		}
	});

    Users_have_Projects.sync({force: true});

    return Users_have_Projects;
};

module.exports = Users_have_Projects;