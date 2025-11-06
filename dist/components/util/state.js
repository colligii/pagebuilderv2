export function State(defVal, ctx, stateId) {
    ctx.script.registerState(stateId, defVal);
    return {
        type: 'state',
        get defaultValue() {
            return defVal;
        },
        registerChange(fnStr) {
            return ctx.script.registerChangeByStateId(stateId, fnStr);
        }
    };
}
//# sourceMappingURL=state.js.map