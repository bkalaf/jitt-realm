export type DataReader<T> = {
    read(): T;
};
export type ReaderState = 'init' | 'running' | 'errored' | 'completed';
export function createReader<T extends any[], U>(func: (...args: T) => Promise<U>, ...args: T): DataReader<U> {
    let data: U | undefined;
    let state: ReaderState = 'init';
    let error: Error | undefined;
    let promise: Promise<void> | undefined;

    state = 'running';
    promise = func(...args)
        .then((d) => {
            data = d;
            state = 'completed';
        })
        .catch((e) => {
            error = e;
            state = 'errored';
        });
    const result = {
        read() {
            switch (state) {
                case 'init':
                    throw Error('uninitialized reader');
                case 'running':
                    throw promise as Promise<void>;
                case 'errored':
                    throw error as Error;
                case 'completed':
                    return data as U;
            }
        }
    };
    return result as any;
}
