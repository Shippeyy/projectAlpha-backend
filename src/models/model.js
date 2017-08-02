var Sequelize = require ('sequelize');
const config = require ('../config/config');

var model = {};

var sequelize = new Sequelize(config.postgresql.connectionString, {
    logging: false,
    timestamps: false,
    freezeTableName: true
});

sequelize
  .authenticate()
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = model;