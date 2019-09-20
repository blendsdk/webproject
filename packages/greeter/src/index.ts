import { ServiceLocator } from "@blendsdk/service"

export interface IGreeter {
    greet: (name: string) => string;
}

export function initializeService(_locator: ServiceLocator) {
    return { greet } as IGreeter;
}

export function greet(name: string) {
    return `Hello ${name}!`;
}
