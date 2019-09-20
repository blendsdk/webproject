import { IDictionary } from "@blendsdk/stdlib";

export interface IServiceLocatorConfig {
    [name: string]: (locator: ServiceLocator) => any;
}

export class ServiceLocator {
    protected config: IServiceLocatorConfig;

    protected services: IDictionary = {};

    public constructor(config: IServiceLocatorConfig) {
        this.config = config || {};
    }

    protected loadService(name: string) {
        if (this.config[name]) {
            this.services[name] = this.config[name](this);
        } else {
            throw new Error(`${name} is not a configured as a service!`);
        }
    }

    public get<T>(name: string): T {
        if (!this.services[name]) {
            this.loadService(name);
        }
        return this.services[name] as T;
    }
}

let serviceLocator: ServiceLocator;

export function initializeServiceLocator(config: IServiceLocatorConfig) {
    if (!serviceLocator) {
        serviceLocator = new ServiceLocator(config);
    }
    return serviceLocator;
}
