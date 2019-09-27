import {
    Application,
    AuthenticationController,
    getAuthenticatedUser,
    IRoute,
    IUserValidatorResult,
    NextFunction,
    Request,
    Response,
    response
} from "@blendsdk/webafx";

interface IAuthenticationRequest {
    username: string;
    password: string;
    language?: string;
}

// interface IAuthenticationResponse {
//     success: boolean;
//     token: string;
// }

// async function LoginController(_req: Request, _res: Response) {
//     const { username, password } = getParameters<IAuthenticationRequest>(_req),
//         app = getApplication(_req);
//     if (username === "user1" && password === "secret") {
//         const token = createJWToken(
//             {
//                 username,
//                 claims: ["ADMIN"]
//             },
//             app.getConfig()
//         );
//         const expDate = new Date();
//         expDate.setMinutes(expDate.getMinutes() + 60);
//         _res.cookie(TOKEN_KEY, token, { httpOnly: true, expires: expDate });
//         return response(_res).OK({
//             success: true
//         });
//     } else {
//         return response(_res).unAuthorized("Invalid username or password");
//     }
// }

async function CredentialsController(_req: Request, _res: Response, _next: NextFunction) {
    // const token = getToken(_req);
    // const exp = new Date();
    // // exp.setSeconds(exp.getSeconds() - 1000);
    // // _res.cookie(TOKEN_KEY, "", {
    // //     expires: exp
    // // });
    return response(_res).OK({
        user: getAuthenticatedUser(_req),
        keys: Object.keys(_req.cookies)
    });
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
