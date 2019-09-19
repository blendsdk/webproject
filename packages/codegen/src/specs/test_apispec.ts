import { IAPISpecification, IAPIComponent } from "@blendsdk/codekit";

const paramsRequestResponse: IAPIComponent = {
    q: { type: "number", optional: true },
    list: { type: "number", optional: true, array: true },
    flag: { type: "boolean", optional: true },
    amount: { type: "number", optional: true }
};

const testApiSpec: IAPISpecification = {
    application: "api",
    version: 1,
    endpoints: [
        {
            method: "post",
            url: "/api/params/:q?",
            skipVersioning: true,
            secure: false,
            backend: {
                controller: { name: "testController", from: "./testController" },
                requestType: paramsRequestResponse,
                responseType: paramsRequestResponse
            }
        }
    ],
    components: {
        paramsRequest: paramsRequestResponse
    }
};

export { testApiSpec };
