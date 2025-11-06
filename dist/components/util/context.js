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
                let stylesArr = [];
                stylesArr = [...Object.entries(styles).map(([css, className]) => {
                        return `.${className} { ${css} }`;
                    })];
                const breakpointsStylesArr = Object.entries(breakPointsStyles);
                stylesArr = [...stylesArr,
                    ...breakpointsStylesArr.map(([breakpoint, value]) => {
                        const allCss = Object.entries(value);
                        return `${breakpoints[breakpoint]} {\n ${allCss.map(([css, className]) => {
                            return `.${className} { ${css} }`;
                        }).join('\n')} \n}\n`;
                    })
                ];
                return stylesArr.join('\n');
            },
            registerBreakPoint(breakpointName, condition) {
                breakpoints[breakpointName] = condition;
                return breakpoints[breakpointName];
            }
        };
    }
    function Script() {
        const scripts = [];
        function getFunctionCode(fn) {
            const fnString = fn.toString();
            if (!/^\(\)[ ]{0,}=>[ ]{0,}/.test(fnString))
                throw new Error('Provided function must be a arrow fn');
            return fnString.replace(/^\(\)[ ]{0,}=>[ ]{0,}/, '').replace(/}$/, '');
        }
        return {
            registerScript(script) {
                const fnString = getFunctionCode(script);
                scripts.push(fnString);
                return script;
            },
            convertToScript() {
                return scripts.join('\n');
            }
        };
    }
    return {
        style: Style(),
        script: Script()
    };
}
//# sourceMappingURL=context.js.map