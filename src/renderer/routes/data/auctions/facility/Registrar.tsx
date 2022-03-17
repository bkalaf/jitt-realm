import { $reference } from '../../../../layout/references';

export class Registrar {
    static getInitial(name: string) {
        return $reference[name].initial;
    }
    static getConvert(name: string) {
        return $reference[name].convertTo;
    }
    static getChildren(name: string) {
        return $reference[name].children;
    }
}

// (global as any).JITTRegistrar = Registrar;
