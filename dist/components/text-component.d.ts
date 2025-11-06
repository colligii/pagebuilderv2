import { type BaseComponent } from "./base-component.js";
export declare class TextComponent implements BaseComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
    text: string;
    constructor({ key, props, text }: TextComponentProps);
    build(): string;
}
export interface TextComponentProps {
    key: string;
    props?: {
        [p: string]: string;
    };
    text?: string;
}
//# sourceMappingURL=text-component.d.ts.map