import { type BaseComponent } from "./base-component.js";

export class InitialComponent implements BaseComponent {
    lang: string;
    title: string;
    component: BaseComponent;

    constructor({ lang, title, component }: InitialComponentProps) {
        this.lang = lang;
        this.title = title;
        this.component = component;
    }

    build() {
        return `
<!DOCTYPE html>
<html lang="${this.lang}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.title}/title>
    </head>
    <body>
        ${this.component.build()}
    </body>
</html>
        `
    }
}

export interface InitialComponentProps {
    lang: string,
    title: string,
    component: BaseComponent
}