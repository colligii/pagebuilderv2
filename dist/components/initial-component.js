import {} from "./base-component.js";
import context from "./util/context.js";
export class InitialComponent {
    lang;
    title;
    component;
    constructor({ lang, title, component }) {
        this.lang = lang;
        this.title = title;
        this.component = component;
    }
    build() {
        const ctx = context();
        const component = this.component(ctx);
        const buildedComponent = component.build(ctx);
        return `
<!DOCTYPE html>
<html lang="${this.lang}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.title}</title>
        <style>${ctx.style.convertToCss()}</style>
    </head>
    <body>
        ${buildedComponent}
    </body>
</html>
        `;
    }
}
//# sourceMappingURL=initial-component.js.map