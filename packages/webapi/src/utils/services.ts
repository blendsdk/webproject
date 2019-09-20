import { initializeServiceLocator, ILoggerService, IConfigurationService } from "@blendsdk/webapi-service";
import { ConfigurationService } from "@blendsdk/webapi-config";
import { WinstonLoggerService } from "@blendsdk/webapi-winston-logger";
import { fromRoot } from "./fromroot";
import { IConfig } from "../types";

const WEBAPI_LOGGER_SERVICE = "WEBAPI_LOGGER_SERVICE";
const WEBAPI_CONFIG_SERVICE = "WEBAPI_CONFIG_SERVICE";

const services = initializeServiceLocator({
    [WEBAPI_CONFIG_SERVICE]: () => {
        return new ConfigurationService<IConfig>([
            fromRoot("config", "config.base.json"),
            fromRoot("config", "config.%NODE_ENV%.json"),
            fromRoot("config", ".config.local.json")
        ]);
    },
    [WEBAPI_LOGGER_SERVICE]: () => {
        return new WinstonLoggerService({
            console: configService.getConfig().DEBUG === true,
            fileLogger: [
                {
                    filename: fromRoot("logs/error.log"),
                    level: "error"
                },
                {
                    filename: fromRoot("logs", "access.log"),
                    level: "info"
                }
            ]
        });
    }
});

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
}

const configService: IConfigurationService<IConfig> = services.get<IConfigurationService<IConfig>>(
    WEBAPI_CONFIG_SERVICE
);

const loggerService: ILoggerService = services.get<ILoggerService>(WEBAPI_LOGGER_SERVICE);

export { services, loggerService, configService };
