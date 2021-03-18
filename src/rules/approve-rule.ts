import { Rule } from './rule'

export class ApproveRule extends Rule {
    constructor(func: (req: any) => boolean, name: string){
        super(func, name);
        this.type = Rule.APPROVE_RULE;
    }
}
