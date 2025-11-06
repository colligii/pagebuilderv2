import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class TextComponent {
    key;
    props;
    css;
    text;
    constructor({ key, props, text, css }) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.text = text ?? '';
    }
    build(ctx) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css);
        return `<${initial}>${this.text ?? ''}</${this.key}>`;
    }
}
//# sourceMappingURL=text-component.js.map