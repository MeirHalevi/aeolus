export class MissingStoreCahceError extends Error {
    constructor(m: string) {
        super(m);

        Object.setPrototypeOf(this, MissingStoreCahceError.prototype);
    }
}