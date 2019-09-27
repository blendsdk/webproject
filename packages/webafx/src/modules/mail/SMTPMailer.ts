import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Application } from "../../application/Application";
import { IRuntimeConfig } from "../configuration/Types";

/**
 * Creates a default mailer for the application
 *
 * @export
 * @param {Application} app
 * @returns {Mail}
 */
export function DefaultSMTPMailer(app: Application): Mail {
    const config = app.getConfig<IRuntimeConfig>();
    app.getLogger().info(`Configuring SMTPMailer to ${config.SMTP_HOST}`);
    const smtpConfig = {
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
    return nodemailer.createTransport(smtpConfig);
}
