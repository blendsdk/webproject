import * as path from "path";

export function fromRoot(...args: any[]) {
    return path.join(...["..", "..", ...args]);
}
