import { existsSync, mkdirSync, writeFileSync } from 'fs';
export default function saveToPublic(path, component) {
    const splittedPath = path.split('/');
    const [file, ...arrPath] = splittedPath.reverse();
    const folder = arrPath.reverse().join('/');
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
    }
    writeFileSync(path, component, 'utf-8');
}
//# sourceMappingURL=saveToPublic.js.map