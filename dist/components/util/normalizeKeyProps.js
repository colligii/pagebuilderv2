export default function normalizeKeyProps(key, ctx, props = {}, css = {}, events = {}) {
    let className = [];
    const cssEntries = Object.entries(css);
    const eventsEntries = Object.entries(events);
    if (props.class)
        className.push(props.class);
    if (cssEntries?.length)
        className = [...className,
            cssEntries.map(([key, value]) => ctx?.style.registerCss(key, value)).join(' ')
        ];
    if (className?.length) {
        props.class = className.join(" ");
    }
    if (eventsEntries.length) {
        props.id = props.id ?? ctx?.element.getElemId();
        eventsEntries.forEach(([eventName, eventFn]) => {
            ctx?.script.registerAnonFunc(new Function(`document.querySelector('#${props.id}').addEventListener('${eventName}', () => {${ctx?.script.getFunctionCode(eventFn)}})`));
        });
    }
    const keyWithProps = [
        key,
        ...(Object.entries(props).map(([key, value]) => `${key}="${value}"`))
    ];
    return keyWithProps.join(' ');
}
//# sourceMappingURL=normalizeKeyProps.js.map