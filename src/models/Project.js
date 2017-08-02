import Sequelize from 'sequelize';

const Project = function (sequelize){

	let Project = sequelize.define('Project', {
		GUID: {
			type: Sequelize.UUID,
	        primaryKey: true,
	        defaultValue: Sequelize.UUIDV4,
	        field: "GUID"
		},
		Title: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "Title"
		},
		Gitlink: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "Gitlink"
		},
		Description: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "Description"
		},
		ProjectCreation_Timestamp: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "ProjectCreation_Timestamp"
		},
	},
	{
		logging: false,
		timestamps: false,
		freezeTableName: true
	},
	{
		classMethods: {
			associate: function(model){
				Project.belongsToMany(models.User, {as: 'Users', through: models.Users_have_Projects })
			}
		}
	});

    Project.sync({force: true});

    return Project;
};

module.exports = Project;