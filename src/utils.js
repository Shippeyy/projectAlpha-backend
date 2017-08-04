import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import config from './config/config';
import router from './routes/router';
import helmet from 'helmet';
import model from './models/model';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from 'cors';

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
  
  app.use(cors());
  app.options('*', cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  /*
  app.use(function(req, res, next) {
    const allowedOrigins = ['http://localhost:8080', 'http://192.168.8.102:3000'];
    let origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });
  */
  return app;
}