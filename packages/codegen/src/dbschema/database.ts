import { PostgreSQLDatabase } from "@blendsdk/schemakit";

const database = new PostgreSQLDatabase();

//// SYSTEM Tables
const sys_config = database.addTable("sys_config"),
    sys_i18n = database.addTable("sys_i18n"),
    sys_user = database.addTable("sys_user"),
    sys_role = database.addTable("sys_role"),
    sys_user_role = database.addTable("sys_user_role"),
    sys_profile = database.addTable("sys_user_profile");

sys_i18n
    .primaryKeyColumn("id")
    .stringColumn("locale")
    .stringColumn("key")
    .stringColumn("value", { required: false })
    .uniqueConstraint(["locale", "key"]);

sys_config
    .primaryKeyColumn("config_id")
    .stringColumn("config", { unique: true })
    .stringColumn("value");

sys_user
    .primaryKeyColumn("user_id")
    .stringColumn("username", { unique: true })
    .stringColumn("password")
    .stringColumn("email", { unique: true })
    .booleanColumn("is_active", { default: "true" });

sys_role.primaryKeyColumn("role_id").stringColumn("role_name", { unique: true });

sys_user_role
    .primaryKeyColumn("user_role_id")
    .referenceColumn("user_id", sys_user)
    .referenceColumn("role_id", sys_role);

sys_profile
    .primaryKeyColumn("user_profile_id")
    .stringColumn("gender", { required: false })
    .stringColumn("title", { required: false })
    .stringColumn("first_name")
    .stringColumn("last_name")
    .referenceColumn("user_id", sys_user);

export { database };
