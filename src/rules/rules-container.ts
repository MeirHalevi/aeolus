import { BlockRule } from './block-rule';
import { AllowRule } from './allow-rule';

/**
 * Rules Container
 * Includes the lists of the allowed & blocked rules.
 */
export class RulesContainer<T> {
    private blockRules: Array<BlockRule<T>>;
    private allowRules: Array<AllowRule<T>>;

    constructor() {
        this.blockRules = [];
        this.allowRules = [];
    }

    addBlockRule(callback: (req: T) => Promise<boolean>, name: string): void {
        this.blockRules.push(new BlockRule(callback, name));
    }

    addAllowRules(callback: (req: T) => Promise<boolean>, name: string): void {
        this.allowRules.push(new AllowRule(callback, name));
    }

    async isBlocked(request: T): Promise<boolean> {
        const fetchResult = await Promise.all(
            this.blockRules.map((blockRule) => blockRule.check(request))
        );

        return Promise.resolve(fetchResult.some(blocked => blocked));
    }

    async isAllowed(request: T): Promise<boolean> {
        const fetchResult = await Promise.all(
            this.allowRules.map((allowRules) => allowRules.check(request))
        );

        return Promise.resolve(fetchResult.some(allowed => allowed));
    }
}
