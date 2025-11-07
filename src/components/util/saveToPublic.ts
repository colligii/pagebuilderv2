import { existsSync, mkdirSync, writeFileSync } from 'fs';

export function saveToPublic(path: string, component: string) {
    const splittedPath = path.split('/');
    const [ file, ...arrPath ] = splittedPath.reverse();

    const folder = arrPath.reverse().join('/')

    if(!existsSync(folder)) {
        mkdirSync(folder, { recursive: true })
    }

    writeFileSync(path, component, 'utf-8')
}