import winston from 'winston';

let filename = './log/projectAlpha.log';

let logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: filename })
    ]
  });

module.exports = logger;