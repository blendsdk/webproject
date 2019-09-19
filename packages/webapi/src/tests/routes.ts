import { IRoute } from "@blendsdk/express";
import { testController } from "./testController";

const routes: IRoute[] = [
	{
		method: "post",
		endpoint: "/api/params/:q?",
		controller: testController,
		secure: false,
		parameters: {
			q: {
				optional: true,
				type: "number"
			},
			list: {
				array: true,
				optional: true,
				type: "number"
			},
			flag: {
				optional: true,
				type: "boolean"
			},
			amount: {
				optional: true,
				type: "number"
			}
		}
	}
];

export default routes;
