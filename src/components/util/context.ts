import { State } from "./state.js";

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
        const stateChangeFunction: { [p: string]: string[] } = {}
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
                let endScripts = structuredClone(scripts);
                Object.entries(stateChangeFunction).forEach(([key, value]) => {
                    endScripts.push(`function ${key}(${"val"+(key.replace('state', ''))}) {${value.join('\n')}}`);
                })
                return endScripts.join('\n');
            },
            registerState(stateId: string, initialValue: any) {
                if(stateChangeFunction[`state${stateId}`])
                    throw new Error("State with this id already defined")
                
                let value = '';
                if(typeof initialValue === "string") {
                    value = `"${initialValue}"`;
                } else {
                    value = `${initialValue}`;
                }

                stateChangeFunction[`state${stateId}`] = [
                    `state${stateId} = val${stateId};`
                ];
                scripts.push(`let state${stateId} = ${value}`)
                return stateId;
            },
            registerChangeByStateId(stateId: string, fn: Function) {
                if(!stateChangeFunction[`state${stateId}`])
                    throw new Error("State with this id is not defined")
                
                const fnStr = this.getFunctionCode(fn);

                console.log(fnStr, stateChangeFunction[`state${stateId}`])

                stateChangeFunction[`state${stateId}`]?.push(`${fnStr} = state${stateId}`)

                return fnStr;
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

    function Page() {
        let title: string | undefined;
        return {
            setTitle(t: string| State) {
                if(t instanceof State) {
                    title = String(t.defaultValue);
                    t.registerChange(() => {document.body.title})
                } else {
                    title = t as string;
                }
                return t as string;
            },
            getTitle() {
                return title;
            }
        }
    }

    return {
        style: Style(),
        script: Script(),
        element: Element(),
        page: Page()
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
    registerState(stateId: string, initialValue: string): string
    registerChangeByStateId(stateId: string, fn: Function): string
}

export interface Element {
    getElemId(): string
}

export interface Page {
    setTitle(title: string | State): string
    getTitle(): string | undefined
}


export interface Context {
    style: Style
    script: Script
    element: Element
    page: Page
}