import { BlockRule } from './block-rule';
import { ApproveRule } from './approve-rule';

/**
 * Rules Container
 * Includes the lists of the approved & blocked rules.
 */
export class RulesContainer<T> {
    private blocksRules: Array<BlockRule<T>>;
    private approveRules: Array<ApproveRule<T>>;

    constructor() {
        this.blocksRules = new Array<BlockRule<T>>();
        this.approveRules = new Array<ApproveRule<T>>();
    }

    addBlockRule(callback: (req: T) => boolean, name: string) : void {
        this.blocksRules.push(new BlockRule(callback, name));
    }

    addApproveRule(callback: (req: T) => boolean, name: string) : void {
        this.approveRules.push(new ApproveRule(callback, name));
    }

    isBlocked(request: T) : boolean {
        return this.blocksRules.some(element => element.check(request));
    }

    isApproved(request: T) : boolean {
        return this.approveRules.some(element => element.check(request));
    }
}
