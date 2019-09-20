export interface IConfigurationService<T> {
    getConfig<R extends T>(): R;
}
