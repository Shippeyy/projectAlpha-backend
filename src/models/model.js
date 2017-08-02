import Sequelize from 'sequelize';
import config from '../config/config';

import User from './User';
import Permissionlevel from './Permissionlevel';
import Project from './Project';
import Users_have_Projects from './Users_have_Projects';

let model = {};

let sequelize = new Sequelize(config.postgresql.connectionString, {
    logging: false,
    timestamps: false,
    freezeTableName: true
});

sequelize
  .authenticate()
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

model.User = new User(sequelize);
model.Permissionlevel = new Permissionlevel(sequelize);
model.Project = new Project(sequelize);
model.Users_have_Projects = new Users_have_Projects(sequelize);

module.exports = model;