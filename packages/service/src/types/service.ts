import { ServiceLocator } from "../locator";

export interface IService {
    initializeService(services: ServiceLocator): any;
}
