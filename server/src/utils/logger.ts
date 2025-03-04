import {format, transports, createLogger} from 'winston';

const customFormat = format.combine(
  format.timestamp({
    format: 'HH:mm:ss',
  }),
  format.align(),
  format.printf((info) => {
    const {timestamp, level, message} = info;
    let color = '';
    switch (level) {
      case 'info':
        color = '\x1b[32m'; // green
        break;
      case 'warn':
        color = '\x1b[33m'; // yellow
        break;
      case 'error':
        color = '\x1b[31m'; // red
        break;
      default:
        color = '\x1b[0m'; // reset
    }
    return `${timestamp} | ${color}${level}\x1b[0m | ${(message as string).trim()}`;
  }),
);

export const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.File({filename: 'error.log', level: 'error'}),
    // new transports.File({ filename: "info.log", level: "info" }),
    // new transports.File({ filename: "warning.log", level: "warn" }),
    new transports.File({filename: 'combined.log'}),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: customFormat,
    }),
  );
}
