import { RulesContainer } from '../rules/index'
import { OperationResult } from '../enums/index'

/**
 * Operation class.
 * Apply the run method, to check if the rules that were defined 
 * in the rulesContainer are match to the request
 */
export class Operation {
    rulesContainer: RulesContainer;

    constructor(rulesContainer: RulesContainer) {
        this.rulesContainer = rulesContainer;
    }

    /**
     * 
     * @param request the request the interceptor/middleware get
     * @returns an indication to know if the request is approved or blocked
     */
    run(request: Request) : OperationResult {
        if(this.rulesContainer.isApproved(request)) {
            return OperationResult.Allowed;
        } else if(this.rulesContainer.isBlocked(request)) {
            return OperationResult.Blocked;
        }
        return OperationResult.Regular;
    }
}
