import { Application, createDefaultSMTPMailer } from "@blendsdk/webafx";

const configFiles: string[] = [
    "../../config/config.base.js",
    "../../config/config.%NODE_ENV%.js",
    "../../config/.config.local.js"
];

const { server, app } = new Application({
    configFiles,
    mailer: createDefaultSMTPMailer
}).run();

export { server, app };
