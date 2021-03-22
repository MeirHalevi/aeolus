import { Rule } from './rule'

export class ApproveRule<T> extends Rule<T> {
    constructor(func: (req: T) => boolean, name: string) {
        super(func, name);
        this.type = Rule.APPROVE_RULE;
    }
}
