import { Rule } from './rule'

export class ApproveRule extends Rule {
    constructor(func: Function, name: string){
        super(func, name);
        this.type = Rule.APPROVE_RULE;
    }
}
