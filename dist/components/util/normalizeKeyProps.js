export default function normalizeKeyProps(key, ctx, props = {}, css = {}) {
    props.class += (props.class ?? '') + ' ' + Object.entries(css).map(([key, value]) => ctx?.style.registerCss(key, value)).join(' ');
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ];
    return keyWithProps.join(' ');
}
//# sourceMappingURL=normalizeKeyProps.js.map