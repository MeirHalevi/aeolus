import { Rule } from './rule'

export class BlockRule extends Rule {
    constructor(func: Function, name: string){
        super(func, name);
        this.type = Rule.BLOCK_RULE;
    }
}