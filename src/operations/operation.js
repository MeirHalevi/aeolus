"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const enums_1 = require("../enums");
/**
 * Operation class.
 * Apply the run method, to check if the rules that were defined
 * in the rulesContainer allows or blocks the request
 */
class Operation {
    constructor(rulesContainer) {
        this.rulesContainer = rulesContainer;
    }
    /**
     *
     * @param request the request the interceptor/middleware get
     * @returns an indication to know if the request is allowed or blocked
     */
    async run(request) {
        if (await this.rulesContainer.isAllowed(request)) {
            return enums_1.OperationResult.ALLOWED;
        }
        else if (await this.rulesContainer.isBlocked(request)) {
            return enums_1.OperationResult.BLOCKED;
        }
        return enums_1.OperationResult.REGULAR;
    }
}
exports.Operation = Operation;
