import type { Context } from "./context.js"

export default function normalizeKeyProps(key: string, ctx?: Context, props: { [p: string]: string } = {}, css: { [p: string]: string } = {}) {
    props.class += (props.class ?? '') + ' ' +  Object.entries(css).map(([key, value]) => ctx?.style.registerCss(key, value)).join(' ')
    
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ]

    return keyWithProps.join(' ')
}