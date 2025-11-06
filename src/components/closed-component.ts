import { type BaseComponent } from "./base-component";
import normalizeKeyProps from "./util/normalizeKeyProps";

export class ClosedComponent implements BaseComponent {
    key: string;
    props?: { [p: string]: string }

    constructor({ key, props }: ClosedComponent) {
        this.key = key;
        this.props = props ?? {};
    }
    
    build() {
        const initial = normalizeKeyProps(this.key, this.props);

        return `<${initial}></${this.key}>`
    }
}

export interface ClosedComponent {
    key: string,
    props?: { [p: string]: string }
}