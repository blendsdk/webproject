import { app } from "../server";
import request from "supertest";

test("list parameter", async () => {
    const response = await request(app)
        .post("/api/params")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            list: [1, 2, 3]
        });
    const { list } = response.body;
    expect(list).toEqual([1, 2, 3]);
    expect(response.status).toBe(200);
});

test("boolean parameter", async () => {
    const response = await request(app)
        .post("/api/params")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            flag: false
        });
    const { flag } = response.body;
    expect(flag).toEqual(false);
    expect(response.status).toBe(200);
});

test("number parameter", async () => {
    const response = await request(app)
        .post("/api/params")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            amount: 11
        });
    const { amount } = response.body;
    expect(amount).toEqual(11);
    expect(response.status).toBe(200);
});

test("float parameter", async () => {
    const response = await request(app)
        .post("/api/params/10")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            amount: 12.14
        });
    const { amount, q } = response.body;
    expect(q).toEqual(10);
    expect(amount).toEqual(12.14);
    expect(response.status).toBe(200);
});
