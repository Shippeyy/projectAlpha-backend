import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import config from './config/config';
import router from './routes/router';
import helmet from 'helmet';
import model from './models/model';

module.exports.createApp = function() {
  var app = express();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(helmet());

  app.use(router);
  app.use('/api', router);

  return app;
}