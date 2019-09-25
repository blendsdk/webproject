import { Application, createDefaultSMTPMailer, makeModule } from "@blendsdk/webafx";
import { testModule } from './testmodule';
import { MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE } from '@blendsdk/webafx/dist/modules/constants';

const configFiles: string[] = [
    "../../config/config.base.js",
    "../../config/config.%NODE_ENV%.js",
    "../../config/.config.local.js"
];

const { server, app } = new Application({
    configFiles,
    mailer: createDefaultSMTPMailer,
    modules:[
        testModule,
        makeModule(MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE,function(_a:any,_b:any,c:any) {
                    c();
                })
    ]
}).run();

export { server, app };
