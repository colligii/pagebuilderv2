export default function context(): {
    style: {
        registerCss(key: string, value: string): string;
        convertToCss(): string;
        registerBreakPoint(breakpointName: string, condition: string): string;
    };
    script: {
        getFunctionCode(fn: Function): string;
        registerScript(script: Function): string;
        registerFunction(name: string, params: string[], fn: Function): string;
        registerAnonFunc(script: Function): string;
        convertToScript(): string;
    };
    element: {
        getElemId(): string;
    };
};
export interface Style {
    registerCss(key: string, value: string): string;
    registerBreakPoint(breakpointName: string, condition: string): string;
}
export interface Script {
    convertToScript(): string;
    registerFunction(name: string, params: string[], fn: Function): string;
    registerScript(script: Function): string;
    registerAnonFunc(script: Function): string;
    getFunctionCode(script: Function): string;
}
export interface Element {
    getElemId(): string;
}
export interface Context {
    style: Style;
    script: Script;
    element: Element;
}
//# sourceMappingURL=context.d.ts.map