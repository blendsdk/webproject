import * as path from "path";

export function fromRoot(...args: any[]) {
    return path.resolve(path.join(...["..", "..", ...args]));
}
