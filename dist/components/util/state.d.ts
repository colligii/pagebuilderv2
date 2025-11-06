import type { Context } from "./context.js";
export declare function State(defVal: string, ctx: Context, stateId: string): {
    readonly defaultValue: string;
    registerChange(fn: Function): string;
};
export interface State {
    defaultValue: string;
    registerChange(fn: Function): string;
}
//# sourceMappingURL=state.d.ts.map