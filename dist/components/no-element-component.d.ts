import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
export declare class NoElementComponent implements BaseComponent {
    components: BaseComponent[];
    constructor({ components }: NoElementComponentProps);
    build(ctx: Context): string;
}
export interface NoElementComponentProps {
    components?: BaseComponent[];
}
//# sourceMappingURL=no-element-component.d.ts.map