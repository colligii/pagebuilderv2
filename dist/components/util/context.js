export default function context() {
    function Style() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let counter = 27;
        const styles = {};
        const breakpoints = {};
        const breakPointsStyles = {};
        function getCodeToStyle() {
            if (counter === 0) {
                counter++;
                return "a";
            }
            let str = "";
            let copyCounter = counter;
            while (copyCounter > 0) {
                const remaining = copyCounter % alphabet.length;
                str = alphabet[remaining] + str;
                copyCounter = Math.floor(copyCounter / alphabet.length);
            }
            counter++;
            return str;
        }
        return {
            registerCss(key, value) {
                const breakPointsRegex = new RegExp(`^(${Object.keys(breakpoints).join('|')}):`);
                const matchesClassRegex = key.match(breakPointsRegex);
                if (matchesClassRegex) {
                    const breakpoints = matchesClassRegex[0].replace(':', '');
                    breakPointsStyles[breakpoints] = breakPointsStyles[breakpoints] ?? {};
                    breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`] = breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`] ?? getCodeToStyle();
                    return breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`];
                }
                else {
                    styles[`${key}: ${value};`] = styles[`${key}: ${value};`] ?? getCodeToStyle();
                    return styles[`${key}: ${value};`];
                }
            },
            convertToCss() {
                let styles = [];
                styles = [...Object.entries(styles).map(([css, className]) => {
                        return `.${className} { ${css} }`;
                    })];
                const breakpointsStylesArr = Object.entries(breakPointsStyles);
                styles = [...styles,
                    ...breakpointsStylesArr.map(([breakpoint, value]) => {
                        const allCss = Object.entries(value);
                        return `${breakpoints[breakpoint]} {\n ${allCss.map(([css, className]) => {
                            return `.${className} { ${css} }`;
                        }).join('\n')} \n}\n`;
                    })
                ];
                return styles.join('\n');
            },
            registerBreakPoint(breakpointName, condition) {
                breakpoints[breakpointName] = condition;
                return breakpoints[breakpointName];
            }
        };
    }
    return {
        style: Style()
    };
}
//# sourceMappingURL=context.js.map