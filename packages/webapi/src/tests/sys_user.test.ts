import "./setup";
import { seedDatabase, closeConnection } from "./setup";
import { insertIntoSysUser, getSysUserByUserId } from "../database/sys_user";
import { validateUser } from "../services/authentication";
import { assignRolesToUser } from "../services/accounts";
import { insertIntoSysRole } from "../database/sys_role";

beforeAll(async () => {
    await seedDatabase("seed.sql");
});

afterAll(async () => {
    await closeConnection();
});

test("create user", async () => {
    const user = await insertIntoSysUser({
        username: "user1",
        password: "secret",
        email: "user1@example.com"
    });
    expect(user.password).not.toEqual("secret");
});

test("get user", async () => {
    const user = await getSysUserByUserId({ user_id: 1 });
    expect(user.password).not.toEqual("secret");
});

test("validate user", async () => {
    const vUser = await validateUser("user1", "secret");
    expect(vUser.error).toBeNull();
    expect(vUser.user.password).toBeUndefined();
    expect(vUser.user.email).toEqual("user1@example.com");
    expect(vUser.user.roles).toEqual([]);
});

test("assign roles to user", async () => {
    const user = await insertIntoSysUser({
        username: "user2",
        password: "secret",
        email: "user2@example.com"
    });
    await insertIntoSysRole({ role_name: "role1" });
    await insertIntoSysRole({ role_name: "role2" });
    await insertIntoSysRole({ role_name: "role3" });
    await assignRolesToUser(user.user_id, ["role1", "role3"]);
    const vUser = await validateUser("user2", "secret");
    expect(vUser.user.roles).toEqual(["role1", "role3"]);
});

test("assign non-existing roles", async () => {
    await expect(assignRolesToUser(1, ["roleX", "roleY"])).rejects.toEqual(
        "None of the provided roles could be assigned to this user!"
    );
});
