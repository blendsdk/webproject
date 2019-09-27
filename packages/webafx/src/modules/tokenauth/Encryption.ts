import crypto from "crypto";

/**
 * Encrypt the JWT token¸
 *
 * @export
 * @param {string} data
 * @param {string} secret
 * @returns {string}
 */
export function encryptData(data: string, secret: string): string {
    try {
        console.log(data);
        const cipher = crypto.createCipher("aes-256-cbc", secret);
        return Buffer.concat([cipher.update(Buffer.from(data, "utf8")), cipher.final()]).toString("hex");
    } catch (exception) {
        throw new Error(exception.message);
    }
}

/**
 * Decrypt the JWT token
 *
 * @export
 * @param {string} data
 * @param {string} secret
 * @returns
 */
export function decryptData(data: string, secret: string) {
    try {
        const decipher = crypto.createDecipher("aes-256-cbc", secret);
        return Buffer.concat([decipher.update(Buffer.from(data, "hex")), decipher.final()]).toString();
    } catch (exception) {
        throw new Error(exception.message);
    }
}
