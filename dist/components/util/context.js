import { State } from "./state.js";
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
        return {
            getFunctionCode(fn) {
                const fnString = fn.toString();
                if (!/^\(\)[ ]{0,}=>[ ]{0,}\{/.test(fnString))
                    throw new Error('Provided function must be a arrow fn');
                return fnString.replace(/^\(\)[ ]{0,}=>[ ]{0,}\{/, '').replace(/}$/, '').trim();
            },
            registerScript(script) {
                const fnString = this.getFunctionCode(script);
                scripts.push(fnString);
                return fnString;
            },
            registerFunction(name, params, fn) {
                const fnString = this.getFunctionCode(fn);
                const endFn = `function ${name}(${params.join(', ')}) {${fnString}}`;
                scripts.push(endFn);
                return endFn;
            },
            registerAnonFunc(script) {
                const fnString = script.toString().replace('function anonymous(\n) {', '').replace(/}$/, '');
                scripts.push(fnString);
                return fnString;
            },
            convertToScript() {
                return scripts.join('\n');
            }
        };
    }
    function Element() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let counter = 27;
        return {
            getElemId() {
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
        };
    }
    function Page() {
        let title;
        return {
            setTitle(t) {
                if (t instanceof State) {
                    title = String(t.defaultValue);
                }
                else {
                    title = t;
                }
                return t;
            },
            getTitle() {
                return title;
            }
        };
    }
    return {
        style: Style(),
        script: Script(),
        element: Element(),
        page: Page()
    };
}
//# sourceMappingURL=context.js.map