export type IFormContext2<T, TCalc> = {
    formData: T;
    createGetterSetter: (name: string) => [getter: () => any, setter: (ev: any) => void, getError: () => string[]];
    onCancel: () => void;
    onSubmit: () => void;
    onReset: () => void;
    onInput: () => void;
    calcObject: TCalc;
    realm: Realm;
    subscribeCalculation: (name: string, calculation: (x: T, y: TCalc) => string) => void;
    unsubscribeCalculation: (name: string, calculation: (x: T, y: TCalc) => string) => void;
    isValid: boolean;
    appendError: (propertyName: string, message: string) => void;
    clearErrors: () => void;
    isFeedbacking: boolean;
    showFeedback: () => void;
    hideFeedback: () => void;
};
