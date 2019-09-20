import { ServiceLocator } from "@blendsdk/service";
import { IGreeter } from "@blendsdk/greeter";

test("sanity", () => {
    const locator = new ServiceLocator({
        "greeter": "@blendsdk/service/dist/greet"
    });

    const greeter = locator.get<IGreeter>("greeter");

    expect(greeter.greet("John")).toEqual("Hello John!");

});
