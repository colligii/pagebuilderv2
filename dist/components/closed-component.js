import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class ClosedComponent {
    key;
    props;
    components;
    constructor({ key, props, components }) {
        this.key = key;
        this.props = props ?? {};
        this.components = components ?? [];
    }
    build() {
        const initial = normalizeKeyProps(this.key, this.props);
        const html = this.components.map(component => component.build()).join('');
        return `<${initial}>${html ?? ''}</${this.key}>`;
    }
}
//# sourceMappingURL=closed-component.js.map