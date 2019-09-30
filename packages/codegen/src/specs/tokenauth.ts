import { IAPISpecification, IAPIComponent } from "@blendsdk/codekit";

const authenticationRequest: IAPIComponent = {
    username: { type: "string" },
    password: { type: "string" },
    language: { type: "string", optional: true }
};

const authenticationResponse: IAPIComponent = {
    success: { type: "boolean" },
    token: { type: "string" }
};

const tokenAuthSpec: IAPISpecification = {
    application: "api",
    version: 1,
    endpoints: [
        {
            method: "post",
            skipVersioning: true,
            url: "/api/login",
            secure: false,
            backend: {
                controller: { name: "LoginController", from: "./controllers/LoginController" },
                requestType: authenticationRequest,
                responseType: authenticationResponse
            },
            frontend: {
                methodName: "authenticate",
                controller: {
                    name: "AuthenticationEndpointHandler",
                    from: "./AuthenticationEndpointHandler"
                }
            }
        }
    ],
    components: {
        authenticationRequest,
        authenticationResponse
    }
};

export { tokenAuthSpec };
