# Aeolus
Request rules manager in order to block/allow request. Can be in use in interceptors/middlewares.

## Overview
The `Operation` class allows one to execute a sequence of commands (rules) as a whole.
Each Rule returns a boolean result as indication of the check method.

## API
### Instantiation
To create an operation
```typescript
const operation = new Operation<T>(rulesContainer)
```
where 
* `<T>` is the request class
* `rulesContainer` is an instance of `RulesContainer<T>` 


### `RulesContainer<T>`
#### `addApproveRule(callback: (req: T) => Promise<boolean>, name: string): void`
Receives a function reference and adds it to the operation execution approved rules plan.
If the result is true, the request will be mark as approved

#### `addBlockRule(callback: (req: T) => Promise<boolean>, name: string): void`
Receives a function reference and adds it to the operation execution blocked rules plan.
If the result is true, the request will be mark as blocked.


### `run`
Run on all the rules that defined in this order:
1)approved rules  
2)blocked rules  
3)throttled rules  

Should return a `OperationResult`, to understand the request status.  

If no rules have been defined, the `OperationResult` status will be `REGULAR`
## Examples
Using NestJS as a framework for the examples but could be used with any other framework that allows to create interceptors/middlewares.
### Definition
```typescript
interface AeulosApiRequest extends Request {
    userAgent: string;
}

@Injectable()
export class AeulosRedis implements StoreCache {

    async read(key: string): Promise<string | null> {
        // implement logic to fetch by key
    }

    write(key: string, value: string, expiresIn: number): Promise<void> {
        // implement logic to store by key, value and expiration
    }

    increment(key: string, amount: number, expiresIn: number): number {
        // implement logic to increment by key, amount and expiration
    }

    delete(key: string): void {
        // implement logic to delete the key
    }
}

@Injectable()
export class ExampleRulesContainer extends RulesContainer<AeulosApiRequest> {

    private static readonly BLOCKLIST_UA = ['BAD_UA, BAD_UA2'];
    private static readonly ALLOWLIST_UA = ['GOOD_UA'];
    private static readonly TTL = 30 * 60;

    constructor() {
        super();
        this.addApproveRule(this.allowedUa, 'allowedUa');
        this.addBlockRule(this.isBadUa, 'badUA');
    }

    allowedUa(request: AeulosApiRequest): Promise<boolean> {
        const allow: boolean = ExampleRulesContainer.ALLOWLIST_UA.some(element => request.userAgent === element);
        return Promise.resolve(allow);
    }

    isBadUa(request: AeulosApiRequest): Promise<boolean> {
        const block: boolean = ExampleRulesContainer.BLOCKLIST_UA.some(element => request.userAgent.includes(element));
        return Promise.resolve(block);
    }
}
```

### Execution
```typescript
@Injectable()
export class AeulosMiddleware implements NestMiddleware {
    constructor (
        private readonly rulesContainer: ExampleRulesContainer,
        private readonly aeulosRedis: AeulosRedis
    ) {}

    async use(request: AeulosApiRequest, response: Response, next: () => void) {
        const operation = new Operation<AeulosApiRequest>(this.rulesContainer);
        AeolusCache.setStoreCache(this.aeulosRedis);
        const result = await operation.run(request);
        switch (result) {
            case OperationResult.ALLOWED: {
                next();
                break;
            }
            case OperationResult.BLOCKED: {
                // blocked logic
            }
            default: {
                next();
                break;
            }
        }
    }
}
```
