import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class ClosedComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }
    css: { [p: string]: string }
    components: BaseComponent[]

    constructor({ key, props, components, css }: ClosedComponentProps) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.components = components ?? [];
    }

    build(ctx: Context) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css);

        const html = this.components.map(component => component.build(ctx)).join('');

        return `<${initial}>${html ?? ''}</${this.key}>`
    }
}

export interface ClosedComponentProps {
    key: string,
    props?: { [p: string]: string },
    css?: { [p: string]: string },
    components?: BaseComponent[]
}