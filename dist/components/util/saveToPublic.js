import { existsSync, mkdirSync, writeFileSync } from 'fs';
export default function saveToPublic(path, component) {
    const splittedPath = path.split('/');
    const [file, ...arrPath] = splittedPath.reverse();
    if (!existsSync(arrPath.join('/'))) {
        mkdirSync(arrPath.join('/'), { recursive: true });
    }
    writeFileSync(path, component, 'utf-8');
}
//# sourceMappingURL=saveToPublic.js.map