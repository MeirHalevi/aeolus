/**
 * Rule class
 * Each rule have a name and a callback method that check
 * if the rule match/mismatch
 **/
export declare class Rule<T> {
    func: (req: T) => Promise<boolean>;
    protected type: string;
    protected name: string;
    static readonly BLOCK_RULE = "block";
    static readonly ALLOW_RULE = "allow";
    constructor(func: (req: T) => Promise<boolean>, name: string);
    /**
     * Check if the request match to the rule that was defined in the callback.
     * In case of match, enrich the request with headers for external use.
     * @param request the request the interceptor/middleware get
     * @returns boolean flag if it match to the rule defined in the callback
     */
    check(request: T): Promise<boolean>;
}
