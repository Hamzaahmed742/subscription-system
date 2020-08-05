import { PinoLogger } from 'nestjs-pino';

export const SetContext = <T extends string>(
  logger: PinoLogger,
  name: T,
): void => {
  logger.setContext(name);
};
