import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import config from './config/config';
import router from './routes/router';
import helmet from 'helmet';
import model from './models/model';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

module.exports.createApp = function() {
  var app = express();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(helmet());

  app.use(cookieParser());
  app.use(expressSession({
  	secret: config.session.secret,
  	resave: false,
	saveUninitialized: false,
  	cookie: {
  		maxAge: 86400000
  	}
  }));

  app.use(router);
  app.use('/api', router);

  return app;
}