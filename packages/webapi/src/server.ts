import { loggerService, configService } from "./utils/services";
import { Server } from "http";

import app from "./app";

let server: Server = null;

const config = configService.getConfig();
config.PORT = config.PORT || 3000;

if (process.env.SHOW_CONFIG) {
    console.log(JSON.stringify(config, null, 4));
}

/**
 * Start Express server if we are not testing.
 */
if (process.env.NODE_ENV !== "test") {
    server = app.listen(config.PORT, async () => {
        try {
            await loggerService.info(
                `App is running at http://localhost:${config.PORT} in ${process.env.NODE_ENV} mode.`
            );
            await loggerService.info("Press CTRL-C to stop\n");
        } catch (err) {
            console.log(err);
            process.exit(-1);
        }
    });
}

export { server, app };
