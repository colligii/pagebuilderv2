import { type BaseComponent } from "./base-component";
export declare class ClosedComponent implements BaseComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
    constructor({ key, props }: ClosedComponent);
    build(): string;
}
export interface ClosedComponent {
    key: string;
    props?: {
        [p: string]: string;
    };
}
//# sourceMappingURL=closed-component.d.ts.map