import { Rule } from './rule';
export declare class AllowRule<T> extends Rule<T> {
    constructor(func: (req: T) => Promise<boolean>, name: string);
}
