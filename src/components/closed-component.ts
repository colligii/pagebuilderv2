import { type BaseComponent } from "./base-component.js";
import normalizeKeyProps from "./util/normalizeKeyProps.js";

export class ClosedComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }
    components: BaseComponent[]

    constructor({ key, props, components }: ClosedComponentProps) {
        this.key = key;
        this.props = props ?? {};
        this.components = components ?? [];
    }

    build() {
        const initial = normalizeKeyProps(this.key, this.props);

        const html = this.components.map(component => component.build()).join('');

        return `<${initial}>${html ?? ''}</${this.key}>`
    }
}

export interface ClosedComponentProps {
    key: string,
    props?: { [p: string]: string },
    components?: BaseComponent[]
}