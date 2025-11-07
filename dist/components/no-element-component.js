import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class NoElementComponent {
    components;
    constructor({ components }) {
        this.components = components ?? [];
    }
    build(ctx) {
        const html = this.components.map(component => component.build(ctx)).join('');
        return `${html ?? ''}`;
    }
}
//# sourceMappingURL=no-element-component.js.map