import { BlockRule } from './block-rule'
import { ApproveRule } from './approve-rule'

/**
 * Rules Container
 * Includes the lists of the approved & blocked rules.
 */
export class RulesContainer {
    private blocksRules: Array<BlockRule>;
    private approveRules: Array<ApproveRule>;

    constructor() {
        this.blocksRules = new Array<BlockRule>();
        this.approveRules = new Array<ApproveRule>();
    }

    addBlockRule(callback: Function, name: string){
        this.blocksRules.push(new BlockRule(callback, name));
    }

    addApproveRule(callback: Function, name: string){
        this.approveRules.push(new ApproveRule(callback, name));
    }

    isBlocked(request: Request) : boolean {
        return this.blocksRules.some(element => element.check(request));
    }

    isApproved(request: Request) : boolean {
        return this.approveRules.some(element => element.check(request));
    }
}
