/**
 * Rules Container
 * Includes the lists of the allowed & blocked rules.
 */
export declare class RulesContainer<T> {
    private blockRules;
    private allowRules;
    constructor();
    addBlockRule(callback: (req: T) => Promise<boolean>, name: string): void;
    addAllowRules(callback: (req: T) => Promise<boolean>, name: string): void;
    isBlocked(request: T): Promise<boolean>;
    isAllowed(request: T): Promise<boolean>;
}
