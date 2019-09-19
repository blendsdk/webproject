import chalk from "chalk";
import { generateRestFramework } from "@blendsdk/codekit";
import { testApiSpec, apiSpec } from "../specs";

console.log(chalk.green("Creating Routes"));
generateRestFramework(apiSpec, {
    routerOutFile: "src/routes.ts",
    routerTypesOutFile: "src/common/api_types.ts",
    clientOutFile: "../client1/src/api/client.ts",
    clientTypesOutFile: "../client1/src/api/api_types.ts"
});
generateRestFramework(testApiSpec, {
    routerOutFile: "src/tests/routes.ts",
    routerTypesOutFile: "src/tests/test_api_types.ts",
    clientOutFile: "../temp/test/client.ts",
    clientTypesOutFile: "../test/temp/api_types.ts"
});
