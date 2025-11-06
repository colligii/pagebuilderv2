import { type BaseComponent } from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class TextComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }
    text: string;

    constructor({ key, props, text }: TextComponentProps) {
        this.key = key;
        this.props = props ?? {};
        this.text = text ?? '';
    }

    build() {
        const initial = normalizeKeyProps(this.key, this.props);

        return `<${initial}>${this.text ?? ''}</${this.key}>`
    }
}

export interface TextComponentProps {
    key: string,
    props?: { [p: string]: string },
    text?: string;
}