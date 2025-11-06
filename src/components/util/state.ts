import type { Context } from "./context.js";

export function State(defVal: string, ctx: Context, stateId: string) {
    ctx.script.registerState(stateId, defVal);

    return {
        type: 'state',
        get defaultValue() {
            return defVal;
        },
        registerChange(fn: Function) {
            return ctx.script.registerChangeByStateId(stateId, fn);
        }
    }

}

export interface State {
    type: string;
    defaultValue: string;
    registerChange(fn: Function): string
}