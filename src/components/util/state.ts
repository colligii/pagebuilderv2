import type { Context } from "./context.js";

export function State(defVal: string, ctx: Context, stateId: string) {
    ctx.script.registerState(stateId, defVal);

    return {
        type: 'state',
        get defaultValue() {
            return defVal;
        },
        registerChange(fnStr: string) {
            return ctx.script.registerChangeByStateId(stateId, fnStr);
        }
    }

}

export interface State {
    type: string;
    defaultValue: string;
    registerChange(fnStr: string): string
}