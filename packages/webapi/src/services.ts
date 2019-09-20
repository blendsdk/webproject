import { initializeServiceLocator, ILoggerService } from "@blendsdk/service";

const services = initializeServiceLocator({
    logger: "@blendsdk/winston-logger"
});

const logger: ILoggerService = services.get<ILoggerService>("logger");

export { services, logger };
