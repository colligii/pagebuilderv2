import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
export declare class InitialComponent implements BaseComponent {
    lang: string;
    title: string;
    component: (context: Context) => BaseComponent;
    constructor({ lang, title, component }: InitialComponentProps);
    build(): string;
}
export interface InitialComponentProps {
    lang: string;
    title: string;
    component: (context: Context) => BaseComponent;
}
//# sourceMappingURL=initial-component.d.ts.map