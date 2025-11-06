import type { Context } from "./context.js";

export class State {
    defaultValue: any;

    constructor(defaultValue: any, ctx: Context) {
        this.defaultValue = defaultValue;
    }
}