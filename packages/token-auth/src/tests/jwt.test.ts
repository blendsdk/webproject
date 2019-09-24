import { isString } from "util";
import { createJWToken, verifyJWTToken } from "../jwt";
test("token creation", async () => {
    process.env.JWT_SECRET = "test1";
    const token = createJWToken(
        {
            sessionData: {
                hello: "world"
            },
            maxAge: 50000
        },
        {
            JWT_SECRET: "secret"
        }
    );
    expect(isString(token)).toEqual(isString(token));
    const decoded: any = await verifyJWTToken(token);
    expect(decoded.data.hello).toEqual("world");
});
