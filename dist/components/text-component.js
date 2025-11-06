import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class TextComponent {
    key;
    props;
    text;
    constructor({ key, props, text }) {
        this.key = key;
        this.props = props ?? {};
        this.text = text ?? '';
    }
    build() {
        const initial = normalizeKeyProps(this.key, this.props);
        return `<${initial}>${this.text ?? ''}</${this.key}>`;
    }
}
//# sourceMappingURL=text-component.js.map