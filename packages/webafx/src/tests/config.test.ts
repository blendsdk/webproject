import { ApplicationConfiguration } from "../modules/configuration/Configuration";

interface IConfig {
    db_host?: string;
    db_password?: string;
    api?: string;
    hello?: string;
    copy?: string;
}

test("single config", () => {
    const config = new ApplicationConfiguration("./src/tests/assets/config1.js").getConfig<IConfig>();
    expect(config.db_host).toEqual("db1");
    expect(config.db_password).toEqual("secret");
    expect(config.api).toEqual("api.local");
    expect(config.copy).toEqual("test");
});

test("multi config", () => {
    const config = new ApplicationConfiguration([
        "./src/tests/assets/config1.js",
        "./src/tests/assets/config2.js"
    ]).getConfig<IConfig>();
    expect(config.db_host).toEqual("db1");
    expect(config.db_password).toEqual("secret");
    expect(config.api).toEqual("api.test");
});

test("simgle env", () => {
    const config = new ApplicationConfiguration(["./src/tests/assets/config.%NODE_ENV%.js"]).getConfig<IConfig>();
    expect(config.hello).toEqual("world");
});
