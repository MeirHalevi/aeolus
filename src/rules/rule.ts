/** 
 * Rule class
 * Each rule have a name and a callback method that check 
 * if the rule match/dismatch
 **/
export class Rule {
    func: (req: any) => boolean;
    protected type: string;
    protected name: string;

    public static readonly BLOCK_RULE = 'block';
    public static readonly APPROVE_RULE = 'approve';

    constructor(func: (req: any) => boolean, name: string) {
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
    check(request: Request) : boolean {
        let match = this.func(request);
        if (match) {
            request.headers.append("aleous.matched", this.name);
            request.headers.append("aleous.matched.type", this.type);
        }
        return match;
    }
}
