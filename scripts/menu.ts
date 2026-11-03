import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as p from '@clack/prompts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8')) as {
  scripts?: Record<string, string>;
};

const scripts = Object.entries(pkg.scripts ?? {}).filter(([name]) => name !== 'menu');

p.intro('🚀 typescript-for-testers — menu skryptów');

const selected = await p.select({
  message: 'Wybierz skrypt do uruchomienia:',
  options: scripts.map(([name, cmd]) => ({
    value: name,
    label: name,
    hint: cmd,
  })),
});

if (p.isCancel(selected)) {
  p.cancel('❌ Anulowano');
  process.exit(0);
}

p.log.info(`▶️  Uruchamiam: npm run ${selected}`);
execSync(`npm run ${selected}`, { cwd: root, stdio: 'inherit' });
p.outro('✅ Zakończono');
