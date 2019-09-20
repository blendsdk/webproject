import { ConfigurationService } from "../index";

interface IConfig {
    db_host?: string;
    db_password?: string;
    api?: string;
    hello?: string;
    copy?: string;
}

test("single config", () => {
    const config = new ConfigurationService<IConfig>("./src/tests/assets/config1.json").getConfig();
    expect(config.db_host).toEqual("db1");
    expect(config.db_password).toEqual("secret");
    expect(config.api).toEqual("api.local");
    expect(config.copy).toEqual("test");
});

test("multi config", () => {
    const config = new ConfigurationService<IConfig>([
        "./src/tests/assets/config1.json",
        "./src/tests/assets/config2.json"
    ]).getConfig();
    expect(config.db_host).toEqual("db1");
    expect(config.db_password).toEqual("secret");
    expect(config.api).toEqual("api.test");
});

test("simgle env", () => {
    const config = new ConfigurationService<IConfig>(["./src/tests/assets/config.%NODE_ENV%.json"]).getConfig();
    expect(config.hello).toEqual("world");
});
