import { IDictionary } from "@blendsdk/stdlib";

class ServiceLocator {
    protected domains: string[] = [];
    protected services: IDictionary = {};

    public discover(domain?: string | string[]) {
        console.log(process.cwd());
    }

    public getLogger() {}
}

let serviceLocator: ServiceLocator;

export function initializeServiceLocator(domain: string | string[]) {
    if (!serviceLocator) {
        serviceLocator = new ServiceLocator();
    }
    return serviceLocator;
}
