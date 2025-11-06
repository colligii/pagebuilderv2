import {} from "./base-component";
import normalizeKeyProps from "./util/normalizeKeyProps";
export class ClosedComponent {
    key;
    props;
    constructor({ key, props }) {
        this.key = key;
        this.props = props ?? {};
    }
    build() {
        const initial = normalizeKeyProps(this.key, this.props);
        return `<${initial}></${this.key}>`;
    }
}
//# sourceMappingURL=closed-component.js.map