export default function normalizeKeyProps(key: string, props: { [p: string]: string } = {}) {
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ]

    return keyWithProps.join(' ')
}