import { Rule } from './rule';

export class AllowRule<T> extends Rule<T> {
    constructor(func: (req: T) =>Promise<boolean>, name: string) {
        super(func, name);
        this.type = Rule.ALLOW_RULE;
    }
}
