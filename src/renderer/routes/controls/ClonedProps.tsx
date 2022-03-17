import { Result } from "../../hooks/Result";

export type ClonedProps = {
    feedbacking?: boolean;
    formName?: string;
    getValue?: (propName: string, stringify: IStringifyFunction) => any;
    setValue?: (propName: string, parse: IParseFunction) => (value: any) => void;
    subscribe?: (propName: string, ref: React.RefObject<DataEntryElement>, v: ((x: any) => Result<any>)[]) => () => void;
};
