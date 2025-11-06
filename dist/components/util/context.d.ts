export default function context(): {
    style: {
        registerCss(key: string, value: string): string;
        convertToCss(): string;
        registerBreakPoint(breakpointName: string, condition: string): string;
    };
    script: {
        registerScript(script: Function): Function;
        convertToScript(): string;
    };
};
export interface Style {
    registerCss(key: string, value: string): string;
    registerBreakPoint(breakpointName: string, condition: string): string;
}
export interface Script {
    convertToScript(): string;
    registerScript(script: Function): string;
}
export interface Context {
    style: Style;
}
//# sourceMappingURL=context.d.ts.map