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

const greetRequest: IAPIComponent = {
    name: { type: "string", optional: true }
};

const greetResponse: IAPIComponent = {
    hello: { type: "string" }
};

const apiSpec: IAPISpecification = {
    application: "api",
    version: 1,
    endpoints: [
        {
            method: "post",
            skipVersioning: true,
            url: "/api/login",
            secure: false,
            backend: {
                controller: { name: "loginController", from: "./controllers/authentication/loginController" },
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
        },
        {
            method: "post",
            skipVersioning: true,
            url: "/api/greet/:name?/name",
            secure: true,
            backend: {
                controller: { name: "greetController", from: "./controllers/authentication/greetController" },
                requestType: greetRequest,
                responseType: greetResponse
            },
            frontend: {
                methodName: "sayHello"
            }
        }
    ],
    components: {
        authenticationRequest,
        authenticationResponse,
        greetRequest,
        greetResponse
    }
};

export { apiSpec };
