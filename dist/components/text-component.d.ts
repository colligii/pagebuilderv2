import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
export declare class TextComponent implements BaseComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
    css?: {
        [p: string]: string;
    };
    events?: {
        [p: string]: Function;
    };
    text: string;
    constructor({ key, props, text, css, events }: TextComponentProps);
    build(ctx: Context): string;
}
export interface TextComponentProps {
    key: string;
    props?: {
        [p: string]: string;
    };
    css?: {
        [p: string]: string;
    };
    events?: {
        [p: string]: Function;
    };
    text?: string;
}
//# sourceMappingURL=text-component.d.ts.map