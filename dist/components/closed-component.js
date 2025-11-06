import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class ClosedComponent {
    key;
    props;
    css;
    components;
    constructor({ key, props, components, css }) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.components = components ?? [];
    }
    build(ctx) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css);
        const html = this.components.map(component => component.build(ctx)).join('');
        return `<${initial}>${html ?? ''}</${this.key}>`;
    }
}
//# sourceMappingURL=closed-component.js.map