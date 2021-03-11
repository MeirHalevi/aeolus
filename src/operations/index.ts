import { RulesContainer } from '../rules/index'
import { OperationResult } from '../enums/index'

export class Operation {
    rulesContainer: RulesContainer;

    constructor(rulesContainer: RulesContainer) {
        this.rulesContainer = rulesContainer;
    }

    run(request: Request) : OperationResult {
        if(this.rulesContainer.isApproved(request)) {
            return OperationResult.Allowed;
        } else if(this.rulesContainer.isBlocked(request)) {
            return OperationResult.Blocked;
        }
        return OperationResult.Regular;
    }
}