export default function closedComponent({ key, props = {}, components = []}: ClosedComponentProps) {
    const keyWithProps = [
        key, 
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ]

    return `<${keyWithProps.join(' ')}>${components.join('')}</${key}>`
}

export interface ClosedComponentProps {
    key: string,
    props?: { [p: string]: string },
    componentsOrText?: string[]
}