const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = format.printf(info => `${info.timestamp} \n\n${info.level} [${info.label}]: ${info.message}\n`);

function createTransport(name) {
  return new DailyRotateFile({
    filename: `${__dirname}/logs/${name}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
      format.label({ label: path.basename(process.mainModule.filename) }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      logFormat
    )
  });
}

const serverLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'server' },
  transports: [
    createTransport('server')
  ]
});

const serviceLogger = function (name) {
  return createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: name },
    transports: [
      createTransport(name),
      new transports.Console({
        format: format.simple(),
      })
    ]
  });
}

module.exports = {
  serverLogger: serverLogger,
  serviceLogger: serviceLogger
};
