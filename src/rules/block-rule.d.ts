import { Rule } from './rule';
export declare class BlockRule<T> extends Rule<T> {
    constructor(func: (req: T) => Promise<boolean>, name: string);
}
