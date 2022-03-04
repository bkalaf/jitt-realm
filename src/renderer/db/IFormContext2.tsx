
export type IFormContext2<T, TCalc> = {
    formData: T;
    createGetterSetter: (name: string) => [getter: () => any, setter: (ev: any) => void, getError: () => string[]];
    onCancel: () => void;
    onSubmit: () => void;
    onReset: () => void;
    onInput: () => void;
    calcObject: TCalc;
    realm: Realm;
    subscribeCalculation: (item: string) => void;
    unsubscribeCalculation: (item: string) => void;
    isValid: boolean;
    appendError: (propertyName: string, message: string) => void;
    clearErrors: () => void;
    isFeedbacking: boolean;
    showFeedback: () => void;
    hideFeedback: () => void;
};
