import Sequelize from 'sequelize';

const User = function (sequelize){

	let User = sequelize.define('User', {
		GUID: {
			type: Sequelize.UUID,
	        primaryKey: true,
	        defaultValue: Sequelize.UUIDV4,
	        field: "GUID"
		},
		Username: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "Username"
		},
		Firstname: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "Firstname"
		},
		Lastname: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "Lastname"
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "Email"
		},
		Email_verified: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "Email_verified"
		},
		Description: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "Description"
		},
		AccountCreation_Timestamp: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "AccountCreation_Timestamp"
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
				User.belongsToMany(models.Project, {as: 'Projects', through: models.Users_have_Projects })
			}
		}
	});

    User.sync({force: true});

    return User;
};

module.exports = User;