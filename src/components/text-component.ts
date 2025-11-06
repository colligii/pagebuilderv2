import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class TextComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }
    css?: { [p: string]: string }
    text: string;

    constructor({ key, props, text, css }: TextComponentProps) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.text = text ?? '';
    }

    build(ctx: Context) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css);

        return `<${initial}>${this.text ?? ''}</${this.key}>`
    }
}

export interface TextComponentProps {
    key: string,
    props?: { [p: string]: string },
    css?: { [p: string]: string },
    text?: string;
}