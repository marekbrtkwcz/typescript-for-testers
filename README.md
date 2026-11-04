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

## Moduły

### Math

Moduł `src/math.ts` zawiera podstawowe operacje matematyczne:

| Funkcja | Opis | Przykład |
|---|---|---|
| `add(a, b)` | Dodawanie | `add(2, 3) // 5` |
| `subtract(a, b)` | Odejmowanie | `subtract(5, 3) // 2` |
| `multiply(a, b)` | Mnożenie | `multiply(4, 5) // 20` |
| `divide(a, b)` | Dzielenie | `divide(10, 2) // 5` |
| `power(a, b)` | Potęgowanie | `power(2, 3) // 8` |
| `modulo(a, b)` | Reszta z dzielenia | `modulo(10, 3) // 1` |

> ⚠️ `divide()` i `modulo()` rzucają błąd `Error` przy dzieleniu przez zero.

## Testy

Projekt używa **Vitest** do testowania.

Uruchomienie testów:

```bash
npm test
```

Testy obejmują:
- Testy pozytywne dla wszystkich operacji
- Testy negatywne (NaN, Infinity, edge cases)

## Narzędzia

- **TypeScript 7.0.2** — język, strict mode, nowoczesne opcje tsconfig
- **tsx** — uruchamianie TS bez kompilacji
- **Biome** — linter + formatter (zastępuje ESLint + Prettier)
- **Vitest** — framework testowy
- **@clack/prompts** — interaktywne menu w terminalu
- **zod** — walidacja schematów
- **@faker-js/faker** — generowanie danych testowych
- **npm-check-updates** — aktualizacja zależności
