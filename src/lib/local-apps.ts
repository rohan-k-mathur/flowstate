import fs from 'fs';
import path from 'path';

export interface LocalApp {
  key: string;
  name: string;
}

function loadLocalApps(): LocalApp[] {
  const appsDir = path.join(process.cwd(), 'automat/packages/backend/src/apps');
  if (!fs.existsSync(appsDir)) return [];

  return fs
    .readdirSync(appsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const dirPath = path.join(appsDir, entry.name);
      const indexFile = fs
        .readdirSync(dirPath)
        .find((f) => /^index.*\.js$/.test(f));
      if (!indexFile) return null;
      const content = fs.readFileSync(path.join(dirPath, indexFile), 'utf8');
      const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const keyMatch = content.match(/key:\s*['"`]([^'"`]+)['"`]/);
      if (!nameMatch || !keyMatch) return null;
      return { key: keyMatch[1], name: nameMatch[1] } as LocalApp;
    })
    .filter(Boolean) as LocalApp[];
}

export const localApps: LocalApp[] = loadLocalApps();
