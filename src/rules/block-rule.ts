import { Rule } from './rule';

export class BlockRule<T> extends Rule<T> {
    constructor(func: (req: T) => boolean, name: string) {
        super(func, name);
        this.type = Rule.BLOCK_RULE;
    }
}
