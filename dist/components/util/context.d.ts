export default function context(): {
    style: {
        registerCss(key: string, value: string): string;
        convertToCss(): string;
    };
};
export interface Style {
    registerCss(key: string, value: string): string;
}
export interface Context {
    style: Style;
}
//# sourceMappingURL=context.d.ts.map