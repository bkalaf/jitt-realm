export class Logger {
    static log(message: string) {
        console.log(message);
        process.stdout.write(message + '\n');
    }
    static enter(type: string) {
        const message = `Entering: ${type}`;
        Logger.log(message);
    }
    static change(ev: React.ChangeEvent<DataEntryElement>) {
        const message = `Change: ${JSON.stringify(ev.target.value)}`;
        Logger.log(message);
    }
    static stateChange(prev: any, next: any) {
        const message = `StateChange: \n${JSON.stringify(prev)}\n${JSON.stringify(next)}}`;
        Logger.log(message);
    }
}
