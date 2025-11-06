import { type BaseComponent } from "./base-component.js";
export declare class InitialComponent implements BaseComponent {
    lang: string;
    title: string;
    component: BaseComponent;
    constructor({ lang, title, component }: InitialComponentProps);
    build(): string;
}
export interface InitialComponentProps {
    lang: string;
    title: string;
    component: BaseComponent;
}
//# sourceMappingURL=initial-component.d.ts.map