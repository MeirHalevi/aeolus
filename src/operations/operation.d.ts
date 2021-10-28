import { RulesContainer } from '../rules';
import { OperationResult } from '../enums';
/**
 * Operation class.
 * Apply the run method, to check if the rules that were defined
 * in the rulesContainer allows or blocks the request
 */
export declare class Operation<T> {
    rulesContainer: RulesContainer<T>;
    constructor(rulesContainer: RulesContainer<T>);
    /**
     *
     * @param request the request the interceptor/middleware get
     * @returns an indication to know if the request is allowed or blocked
     */
    run(request: T): Promise<OperationResult>;
}
