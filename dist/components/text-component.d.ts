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
    text: string;
    constructor({ key, props, text, css }: TextComponentProps);
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
    text?: string;
}
//# sourceMappingURL=text-component.d.ts.map