import { type BaseComponent } from "./base-component.js";
export declare class ClosedComponent implements BaseComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
    components: BaseComponent[];
    constructor({ key, props, components }: ClosedComponentProps);
    build(): string;
}
export interface ClosedComponentProps {
    key: string;
    props?: {
        [p: string]: string;
    };
    components?: BaseComponent[];
}
//# sourceMappingURL=closed-component.d.ts.map