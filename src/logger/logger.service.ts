import { createLogger, transports, format } from 'winston';
import 'winston-mongodb';

const myCustomLevels = {
  levels: {
    error: 0,
    success: 1,
    REST_operation: 2,
    info: 3,
  },
};

export class LoggerService {
  public logger = createLogger({
    levels: myCustomLevels.levels,
    defaultMeta: { service: 'file-service' },
    transports: [
      new transports.MongoDB({
        db: process.env.MONGODB,
        options: { useUnifiedTopology: true },
        collection: 'Logs',
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });
}
