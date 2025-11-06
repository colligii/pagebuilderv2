export default function context() {
    function Style() {

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        let counter = 27;
        const styles: { [p: string]: string } = {};
        const breakpoints: { [p: string]: string } = {};
        const breakPointsStyles: { [p: string]: { [p: string]: string } } = {};

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
            registerCss(key: string, value: string): string {
                const breakPointsRegex = new RegExp(`^(${Object.keys(breakpoints).join('|')}):`);
                const matchesClassRegex = key.match(breakPointsRegex);
                if (matchesClassRegex) {
                    const breakpoints = matchesClassRegex[0].replace(':', '');
                    breakPointsStyles[breakpoints] = breakPointsStyles[breakpoints] ?? {};
                    breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`] = breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`] ?? getCodeToStyle();
                    return breakPointsStyles[breakpoints][`${key.replace(matchesClassRegex[0], '')}: ${value}`] as string;
                } else {
                    styles[`${key}: ${value};`] = styles[`${key}: ${value};`] ?? getCodeToStyle();
                    return styles[`${key}: ${value};`] as string;
                }
            },
            convertToCss(): string {
                let stylesArr: string[] = [];

                stylesArr = [...Object.entries(styles).map(([css, className]) => {
                    return `.${className} { ${css} }`
                })];

                const breakpointsStylesArr = Object.entries(breakPointsStyles);

                stylesArr = [...stylesArr,
                ...breakpointsStylesArr.map(([breakpoint, value]) => {
                    const allCss = Object.entries(value);
                    return `${breakpoints[breakpoint]} {\n ${allCss.map(([css, className]) => {
                        return `.${className} { ${css} }`
                    }).join('\n')
                        } \n}\n`
                })
                ]

                return stylesArr.join('\n')
            },
            registerBreakPoint(breakpointName: string, condition: string) {
                breakpoints[breakpointName] = condition;
                return breakpoints[breakpointName];
            }

        }
    }

    function Script() {
        const scripts: string[] = [];



        return {
            getFunctionCode(fn: Function) {
                const fnString = fn.toString()
                if (!/^\(\)[ ]{0,}=>[ ]{0,}\{/.test(fnString))
                    throw new Error('Provided function must be a arrow fn');

                return fnString.replace(/^\(\)[ ]{0,}=>[ ]{0,}\{/, '').replace(/}$/, '').trim();
            },
            registerScript(script: Function) {
                const fnString = this.getFunctionCode(script);
                scripts.push(fnString);
                return fnString;
            },
            registerFunction(name: string, params: string[], fn: Function): string {
                const fnString = this.getFunctionCode(fn);
                const endFn = `function ${name}(${params.join(', ')}) {${fnString}}`;
                scripts.push(endFn);
                return endFn;
            },
            registerAnonFunc(script: Function) {
                const fnString = script.toString().replace('function anonymous(\n) {', '').replace(/}$/, '');
                scripts.push(fnString);
                return fnString;
            },
            convertToScript() {
                return scripts.join('\n');
            }
        }
    }

    function Element() {

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
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

        }
    }

    return {
        style: Style(),
        script: Script(),
        element: Element()
    }
}

export interface Style {
    registerCss(key: string, value: string): string
    registerBreakPoint(breakpointName: string, condition: string): string
}

export interface Script {
    convertToScript(): string
    registerFunction(name: string, params: string[], fn: Function): string
    registerScript(script: Function): string
    registerAnonFunc(script: Function): string
    getFunctionCode(script: Function): string
}

export interface Element {
    getElemId(): string
}

export interface Context {
    style: Style
    script: Script
    element: Element
}