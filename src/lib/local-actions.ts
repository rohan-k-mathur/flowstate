import fs from 'fs';
import path from 'path';

export interface LocalAction {
  key: string;
  name: string;
}

export type LocalActionsMap = Record<string, LocalAction[]>;

function loadLocalActions(): LocalActionsMap {
  const appsDir = path.join(process.cwd(), 'automat/packages/backend/src/apps');
  if (!fs.existsSync(appsDir)) return {};

  const result: LocalActionsMap = {};

  for (const appEntry of fs.readdirSync(appsDir, { withFileTypes: true })) {
    if (!appEntry.isDirectory()) continue;
    const appKey = appEntry.name;
    const actionsDir = path.join(appsDir, appKey, 'actions');
    if (!fs.existsSync(actionsDir)) continue;

    const actions: LocalAction[] = [];

    for (const actionEntry of fs.readdirSync(actionsDir, { withFileTypes: true })) {
      if (!actionEntry.isDirectory()) continue;
      const actionDir = path.join(actionsDir, actionEntry.name);
      const indexFile = fs
        .readdirSync(actionDir)
        .find((f) => /^index.*\.js$/.test(f));
      if (!indexFile) continue;
      const content = fs.readFileSync(path.join(actionDir, indexFile), 'utf8');
      const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const keyMatch = content.match(/key:\s*['"`]([^'"`]+)['"`]/);
      if (nameMatch && keyMatch) {
        actions.push({ key: keyMatch[1], name: nameMatch[1] });
      }
    }

    if (actions.length > 0) {
      result[appKey] = actions;
    }
  }

  return result;
}

export const localActions: LocalActionsMap = loadLocalActions();
