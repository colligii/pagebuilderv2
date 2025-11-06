export default function closedComponent({ key, props = {}, componentsOrText = []}: ClosedComponentProps) {
    const keyWithProps = [
        key, 
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ]

    return `<${keyWithProps.join(' ')}>${componentsOrText.join('')}</${key}>`
}

export interface ClosedComponentProps {
    key: string,
    props?: { [p: string]: string },
    componentsOrText?: string[]
}