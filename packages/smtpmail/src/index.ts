import { IConfigurationService, ILoggerService } from "@blendsdk/webapi-service";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Options } from "nodemailer/lib/smtp-transport";

/**
 * Interface for describing the SMTP mailer options
 *
 * @export
 * @interface INodeMailerConfig
 * @extends {Options}
 */
export interface INodeMailerConfig extends Options {}

/**
 * Interface describing the project configuration
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
    DEBUG: boolean;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_SECURE: boolean;
}

/**
 * Export the Mail class to be reused
 */
export { Mail };

/**
 * Create a NoeMailer configuration object.
 *
 * @returns {INodeMailerConfig}
 */
function getMailerConfigFromEnvironment(
    configService: IConfigurationService<IConfig>,
    loggerService: ILoggerService
): INodeMailerConfig {
    const config = configService.getConfig();
    loggerService.info("Configuring SMTPMailer", { host: config.SMTP_HOST });
    return {
        host: config.SMTP_HOST,
        // tslint:disable-next-line: radix
        port: config.SMTP_PORT,
        secure: config.SMTP_SECURE === true ? true : false,
        auth: {
            user: config.SMTP_USERNAME,
            pass: config.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    };
}

/**
 * Initialized a SMTP nodemailer instance.
 *
 * @export
 * @param {INodeMailerConfig} [config]
 * @returns {Mail}
 */
export function initializeMailer(configService: IConfigurationService<IConfig>, loggerService: ILoggerService): Mail {
    return nodemailer.createTransport(getMailerConfigFromEnvironment(configService, loggerService));
}
