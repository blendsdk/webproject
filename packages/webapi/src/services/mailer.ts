import { initializeMailer as initMailer, Mail } from "@blendsdk/express";

/**
 * SMTPMailer instance
 */
export let mailer: Mail;

/**
 * Initializes the SMTPMailer.
 * This function needs only be called onces
 * when the application is starting up.
 *
 * @export
 */
export function initializeMailer() {
    mailer = initMailer();
}
