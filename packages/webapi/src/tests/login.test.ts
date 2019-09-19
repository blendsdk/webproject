import { app } from "../server";
import request from "supertest";

test("login endpoint test", async () => {
    const response = await request(app)
        .post("/api/login")
        .send({
            username: "user2",
            password: "secret"
        });
    const { error, success, token } = response.body;
    expect(response.status).toBe(200);
    expect(error).toBeUndefined();
    expect(success).toEqual(true);
    expect(token).toBeDefined();
});

test("failed login endpoint test", async () => {
    const response = await request(app)
        .post("/api/login")
        .send({
            username: "userX",
            password: "secret"
        });
    const { error, success, token, message } = response.body;
    expect(response.status).toBe(401);
    expect(error).toEqual(true);
    expect(success).toBeUndefined();
    expect(token).toBeUndefined();
    expect(message).toEqual("Invalid username or password!");
});
