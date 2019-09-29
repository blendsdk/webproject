import {
    Application,
    AuthenticationController,
    CredentialsController,
    IRoute,
    IUserValidatorResult
} from "@blendsdk/webafx";

interface IAuthenticationRequest {
    username: string;
    password: string;
    language?: string;
}

async function ValidateMyUser({ username, password }: IAuthenticationRequest): Promise<IUserValidatorResult> {
    return new Promise((resolve, reject) => {
        try {
            if (username === "gevik" && password === "secret") {
                resolve({
                    error: undefined,
                    user: {
                        id: 1,
                        email: "gevik@gmail.com",
                        claims: ["FINANCE", "DEVELOPER"]
                    }
                });
            } else {
                resolve({
                    error: new Error("Invalid username or password"),
                    user: null
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}

export function authenticationModule(app: Application) {
    const routes: IRoute[] = [
        {
            method: "post",
            endpoint: "/api/login",
            authenticated: false,
            controller: AuthenticationController(ValidateMyUser),
            parameters: {
                username: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                language: {
                    type: "string",
                    optional: true
                }
            }
        },
        {
            method: "post",
            endpoint: "/api/credentials",
            authenticated: true,
            controller: CredentialsController
        }
    ];
    app.addRoute(routes);
}
