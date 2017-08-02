import Sequelize from 'sequelize';

const Permissionlevel = function (sequelize){

	let Permissionlevel = sequelize.define('Permissionlevel', {
		GUID: {
			type: Sequelize.UUID,
	        primaryKey: true,
	        defaultValue: Sequelize.UUIDV4,
	        field: "GUID"
		},
		Level: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: "Level"
		},
		Description: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "Description"
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
			}
		}
	});

    Permissionlevel.sync({force: false});

    return Permissionlevel;
};

module.exports = Permissionlevel;