import { IRoute } from "@blendsdk/express";
import { loginController } from "./controllers/authentication/loginController";
import { greetController } from "./controllers/authentication/greetController";

const routes: IRoute[] = [
	{
		method: "post",
		endpoint: "/api/login",
		controller: loginController,
		secure: false,
		parameters: {
			username: {
				type: "string"
			},
			password: {
				type: "string"
			},
			language: {
				optional: true,
				type: "string"
			}
		}
	},
	{
		method: "post",
		endpoint: "/api/greet/:name?/name",
		controller: greetController,
		secure: true,
		parameters: {
			name: {
				optional: true,
				type: "string"
			}
		}
	}
];

export default routes;
