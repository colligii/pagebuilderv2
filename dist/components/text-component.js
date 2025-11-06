import {} from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";
export class TextComponent {
    key;
    props;
    css;
    events;
    text;
    constructor({ key, props, text, css, events }) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.events = events ?? {};
        this.text = text ?? '';
    }
    build(ctx) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css, this.events);
        return `<${initial}>${this.text ?? ''}</${this.key}>`;
    }
}
//# sourceMappingURL=text-component.js.map