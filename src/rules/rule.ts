/**
 * Rule class
 * Each rule have a name and a callback method that check
 * if the rule match/mismatch
 **/
export class Rule<T> {
    func: (req: T) => Promise<boolean>;
    protected type: string;
    protected name: string;

    public static readonly BLOCK_RULE = 'block';
    public static readonly ALLOW_RULE = 'allow';

    constructor(func: (req: T) => Promise<boolean>, name: string) {
        this.func = func;
        this.type = '';
        this.name = name;
    }

    /**
     * Check if the request match to the rule that was defined in the callback.
     * In case of match, enrich the request with headers for external use.
     * @param request the request the interceptor/middleware get
     * @returns boolean flag if it match to the rule defined in the callback
     */
    async check(request: T) : Promise<boolean> {
        const match = await this.func(request);
        if (match) {
            // TO DO - Add data to the headers of the request
        }
        return match;
    }
}
