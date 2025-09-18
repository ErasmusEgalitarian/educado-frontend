// Used for async functions in event handlers that might throw errors.
export function handleHandlerErrors<A extends unknown[]>(p: (...args: A) => Promise<void>): (...args: A) => void {
    return (...args: A) => {
        p(...args).catch((error: unknown) => { console.error("Error thrown asynchronously", error); })
    }
}