import { RulesContainer } from '../rules';
import { OperationResult } from '../enums';

/**
 * Operation class.
 * Apply the run method, to check if the rules that were defined
 * in the rulesContainer allows or blocks the request
 */
export class Operation<T> {
    rulesContainer: RulesContainer<T>;

    constructor(rulesContainer: RulesContainer<T>) {
        this.rulesContainer = rulesContainer;
    }

    /**
     *
     * @param request the request the interceptor/middleware get
     * @returns an indication to know if the request is allowed or blocked
     */
    async run(request: T) : Promise<OperationResult> {
        if (await this.rulesContainer.isAllowed(request)) {
            return OperationResult.ALLOWED;
        } else if (await this.rulesContainer.isBlocked(request)) {
            return OperationResult.BLOCKED;
        }
        return OperationResult.REGULAR;
    }
}
