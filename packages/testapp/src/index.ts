import { Application, AuthenticationProvider, DefaultSMTPMailer } from "@blendsdk/webafx";
import { authenticationModule } from "./modules/authentication";

const configFiles: string[] = [
    "../../config/config.base.js",
    "../../config/config.%NODE_ENV%.js",
    "../../config/.config.local.js"
];

const { server, app } = new Application({
    configFiles,
    mailer: DefaultSMTPMailer,
    modules: [AuthenticationProvider, authenticationModule]
}).run();

export { server, app };
