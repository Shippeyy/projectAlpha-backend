const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require ('sequelize');
const config = require ('./config/config');
const router = require ('./routes/router');
const helmet = require ('helmet');
const model = require ('./models/model');

module.exports.createApp = function() {
  var app = express();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(helmet());

  app.use(router);
  app.use('/api', router);

  console.log(model);

  return app;
}