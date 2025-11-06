import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class TextComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }
    css?: { [p: string]: string }
    events?: { [p: string]: Function }
    text: string;

    constructor({ key, props, text, css, events }: TextComponentProps) {
        this.key = key;
        this.props = props ?? {};
        this.css = css ?? {};
        this.events = events ?? {};
        this.text = text ?? '';
    }

    build(ctx: Context) {
        const initial = normalizeKeyProps(this.key, ctx, this.props, this.css, this.events);

        return `<${initial}>${this.text ?? ''}</${this.key}>`
    }
}

export interface TextComponentProps {
    key: string,
    props?: { [p: string]: string },
    css?: { [p: string]: string },
    events?: { [p: string]: Function },
    text?: string;
}