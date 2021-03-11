const BLOCK_RULE = 'block';
const APPROVE_RULE = 'approve';

export class Rule {
    func: Function;
    protected type: string;
    protected name: string;

    static get BLOCK_RULE() {
        return BLOCK_RULE;
    }

    static get APPROVE_RULE() {
        return APPROVE_RULE;
    }

    constructor(func: Function, name: string) {
        this.func = func;
        this.type = '';
        this.name = name;
    }

    check(request: Request) : boolean {
        let match = this.func(request);
        if (match) {
            request.headers.append("aleous.matched", this.name);
            request.headers.append("aleous.matched.type", this.type);
        }
        return match;
    }
}