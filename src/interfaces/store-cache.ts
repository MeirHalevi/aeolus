/**
 * The interface of the cache each client need to implement
 * in order to work with the AllowToBan/ FailToBan logic
 */
export interface StoreCache {
    read(key: string): number
    write(key: string, value: number, expiresIn: number): void
    increment(key: string, amount: number, expiresIn: number): number
    delete(key: string): void
}