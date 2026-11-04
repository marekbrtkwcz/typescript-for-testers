import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as p from '@clack/prompts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8')) as {
  scripts?: Record<string, string>;
};

const available = new Map(Object.entries(pkg.scripts ?? {}).filter(([name]) => name !== 'menu'));

const emojis: Record<string, string> = {
  dev: '🛠️',
  build: '🔨',
  start: '▶️',
  watch: '👀',
  test: '🧪',
  'test:watch': '🔁',
  lint: '🔍',
  'lint:fix': '🧹',
  format: '🎨',
  check: '✅',
  'update:deps': '⬆️',
};

// Kolejność grup: praca z kodem -> testy -> jakość kodu -> utrzymanie projektu
const order = [
  'dev',
  'build',
  'start',
  'watch',
  'test',
  'test:watch',
  'lint',
  'lint:fix',
  'format',
  'check',
  'update:deps',
];

const orderedNames = [
  ...order.filter((name) => available.has(name)),
  ...[...available.keys()].filter((name) => !order.includes(name)),
];

const exitOption = '__exit__';

p.intro('🚀 typescript-for-testers — menu skryptów');

// Ctrl+C podczas skryptu (np. watch) zamyka tylko proces dziecka, menu zostaje
process.on('SIGINT', () => {
  // celowo pusty handler
});

while (true) {
  const selected = await p.select({
    message: 'Wybierz skrypt do uruchomienia:',
    options: [
      ...orderedNames.map((name) => ({
        value: name,
        label: `${emojis[name] ?? '📜'} ${name}`,
        hint: available.get(name) ?? '',
      })),
      { value: exitOption, label: '🚪 Wyjdź', hint: 'zamknij menu' },
    ],
  });

  if (p.isCancel(selected) || selected === exitOption) {
    p.cancel('👋 Do zobaczenia!');
    process.exit(0);
  }

  p.log.info(`▶️  Uruchamiam: npm run ${selected}`);
  try {
    execSync(`npm run ${selected}`, { cwd: root, stdio: 'inherit' });
    p.log.success('✅ Zakończono — wracam do menu');
  } catch (error) {
    if ((error as { signal?: string | null }).signal === 'SIGINT') {
      p.log.info('⏹️  Przerwano — wracam do menu');
    } else {
      p.log.error('❌ Skrypt zakończył się błędem — wracam do menu');
    }
  }
}
