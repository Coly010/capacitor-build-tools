import winston, { Logger } from 'winston';

let winstonInstance: Logger;

export const logger = (level = 'info') => {
  if (!winstonInstance) {
    winstonInstance = winston.createLogger({
      level,
      format: winston.format.simple(),
      transports: [new winston.transports.Console()],
    });
  }
  return winstonInstance;
};
