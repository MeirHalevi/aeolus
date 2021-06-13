export class MissingStoreCahceError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, MissingStoreCahceError.prototype);
    }
}
