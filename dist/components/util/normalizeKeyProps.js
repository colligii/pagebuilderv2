export default function normalizeKeyProps(key, ctx, props = {}, css = {}) {
    let className = [];
    const cssEntries = Object.entries(css);
    if (props.class)
        className.push(props.class);
    if (cssEntries?.length)
        className = [...className,
            cssEntries.map(([key, value]) => ctx?.style.registerCss(key, value)).join(' ')
        ];
    if (className?.length) {
        props.class = className.join(" ");
    }
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ];
    return keyWithProps.join(' ');
}
//# sourceMappingURL=normalizeKeyProps.js.map