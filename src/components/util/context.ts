export default function context() {
    function Style() {

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        let counter = 27;
        const styles: { [p: string]: string } = {};

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
                styles[`${key}: ${value};`] = styles[`${key}: ${value};`] ?? getCodeToStyle();
                return styles[`${key}: ${value};`] as string;
            },
            convertToCss(): string {
                return Object.entries(styles).map(([css, className]) => {
                    return `.${className} { ${css} }`
                }).join(`\n`)
            }
        }
    }

    return {
        style: Style()
    }
}

export interface Style {
    registerCss(key: string, value: string): string
}

export interface Context {
    style: Style
}