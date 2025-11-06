import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
export declare class ClosedComponent implements BaseComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
    css: {
        [p: string]: string;
    };
    components: BaseComponent[];
    constructor({ key, props, components, css }: ClosedComponentProps);
    build(ctx: Context): string;
}
export interface ClosedComponentProps {
    key: string;
    props?: {
        [p: string]: string;
    };
    css?: {
        [p: string]: string;
    };
    components?: BaseComponent[];
}
//# sourceMappingURL=closed-component.d.ts.map