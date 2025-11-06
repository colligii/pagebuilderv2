import type { Context } from "./context.js";
export declare function State(defVal: string, ctx: Context, stateId: string): {
    type: string;
    readonly defaultValue: string;
    registerChange(fnStr: string): string;
};
export interface State {
    type: string;
    defaultValue: string;
    registerChange(fnStr: string): string;
}
//# sourceMappingURL=state.d.ts.map