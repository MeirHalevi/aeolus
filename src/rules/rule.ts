/** 
 * Rule class
 * Each rule have a name and a callback method that check 
 * if the rule match/dismatch
 **/
export class Rule<T> {
    func: (req: T) => boolean;
    protected type: string;
    protected name: string;

    public static readonly BLOCK_RULE = 'block';
    public static readonly APPROVE_RULE = 'approve';

    constructor(func: (req: T) => boolean, name: string) {
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
    check(request: T) : boolean {
        const match = this.func(request);
        if (match) {
            //TO DO - Add data to the headers of the request
        }
        return match;
    }
}
