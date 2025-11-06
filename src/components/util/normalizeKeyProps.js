export default function normalizeKeyProps(key, props = {}) {
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ];
    return keyWithProps.join(' ');
}
//# sourceMappingURL=normalizeKeyProps.js.map