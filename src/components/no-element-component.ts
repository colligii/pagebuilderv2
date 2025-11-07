import { type BaseComponent } from "./base-component.js";
import type { Context } from "./util/context.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class NoElementComponent implements BaseComponent {
    components: BaseComponent[]

    constructor({ components }: NoElementComponentProps) {
        this.components = components ?? [];
    }

    build(ctx: Context) {
        const html = this.components.map(component => component.build(ctx)).join('');

        return `${html ?? ''}`
    }
}

export interface NoElementComponentProps {
    components?: BaseComponent[]
}