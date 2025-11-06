import {} from "./base-component.js";
import context from "./util/context.js";
import { minify } from 'html-minifier-terser';
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
        const css = ctx.style.convertToCss();
        const script = ctx.script.convertToScript();
        const title = ctx.page.getTitle() ?? this.title;
        return minify(`
<!DOCTYPE html>
<html lang="${this.lang}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        ${css?.length ? '<style>' + css + '</style>' : ''}
    </head>
    <body>
        ${buildedComponent}
        ${script?.length ? '<script>' + script + '</script>' : ''}
    </body>
</html>
        `, {
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: {
                mangle: {
                    toplevel: true,
                    reserved: ["SomeGlobalName"]
                },
                compress: {
                // compressão opcional
                }
            }
        });
    }
}
//# sourceMappingURL=initial-component.js.map