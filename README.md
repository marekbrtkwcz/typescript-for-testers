# typescript-for-testers

Projekt do nauki TypeScript na poziomie testera automatyzującego.

## Wymagania

- Node.js 22+
- npm 10+

## Instalacja

```bash
npm install
```

## Skrypty

Uruchom interaktywne menu wszystkich skryptów:

```bash
npm run menu
```

| Skrypt | Opis |
|---|---|
| `npm run build` | Kompilacja TypeScript do `dist/` (z type-checking) |
| `npm run start` | Kompilacja + uruchomienie `dist/example.js` |
| `npm run dev` | Uruchomienie TS bezpośrednio przez tsx |
| `npm run watch` | Kompilacja w trybie watch |
| `npm run lint` | Lintowanie (Biome) |
| `npm run lint:fix` | Lintowanie z auto-poprawkami |
| `npm run format` | Formatowanie kodu |
| `npm run check` | Lint + format z auto-poprawkami |
| `npm run update:deps` | Aktualizacja zależności do najnowszych wersji |

## Struktura

```
├── scripts/
│   └── menu.ts        # interaktywne menu skryptów (@clack/prompts)
├── src/               # kod źródłowy
├── dist/              # skompilowany kod (gitignored)
├── biome.json         # konfiguracja lintera/formattera
├── tsconfig.json      # konfiguracja TypeScript 7 (strict, ESM NodeNext)
└── package.json
```

## Narzędzia

- **TypeScript 7.0.2** — język, strict mode, nowoczesne opcje tsconfig
- **tsx** — uruchamianie TS bez kompilacji
- **Biome** — linter + formatter (zastępuje ESLint + Prettier)
- **@clack/prompts** — interaktywne menu w terminalu
- **zod** — walidacja schematów
- **@faker-js/faker** — generowanie danych testowych
- **npm-check-updates** — aktualizacja zależności
