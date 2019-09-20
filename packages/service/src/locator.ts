import { IDictionary } from "@blendsdk/stdlib";

export interface IServiceLocatorConfig extends IDictionary {

}

interface IService {

    initializeService(services: ServiceLocator): any;
}

export class ServiceLocator {

    protected config: IServiceLocatorConfig;

    protected services: IDictionary = {};

    public constructor(config: IServiceLocatorConfig) {
        this.config = config || {};
    }

    protected loadService(name: string) {
        this.services[name] = (require(this.config[name]) as IService).initializeService(this);
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
