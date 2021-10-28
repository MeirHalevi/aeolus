"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingStoreCahceError = void 0;
class MissingStoreCahceError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, MissingStoreCahceError.prototype);
    }
}
exports.MissingStoreCahceError = MissingStoreCahceError;
