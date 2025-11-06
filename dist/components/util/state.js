export function State(defVal, ctx, stateId) {
    ctx.script.registerState(stateId, defVal);
    return {
        get defaultValue() {
            return defVal;
        },
        registerChange(fn) {
            return ctx.script.registerChangeByStateId(stateId, fn);
        }
    };
}
//# sourceMappingURL=state.js.map