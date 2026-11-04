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
| `npm run build` | Type-check: `tsc --noEmit` (bez emitu JS) |
| `npm run start` | Uruchomienie `src/module-01/example.ts` przez tsx |
| `npm run dev` | Uruchomienie TS bezpośrednio przez tsx |
| `npm run watch` | Kompilacja w trybie watch |
| `npm run lint` | Lintowanie (Biome) |
| `npm run lint:fix` | Lintowanie z auto-poprawkami |
| `npm run format` | Formatowanie kodu |
| `npm run check` | Lint + format z auto-poprawkami |
| `npm test` | Uruchomienie testów (Vitest) |
| `npm run test:watch` | Testy w trybie watch |
| `npm run test:coverage` | Testy + raport pokrycia v8 (HTML w `coverage/`) |
| `npm run update:deps` | Aktualizacja zależności do najnowszych wersji |

## Struktura

```
├── scripts/
│   └── menu.ts        # interaktywne menu skryptów (@clack/prompts)
├── src/
│   └── module-01/     # moduły: math, pesel, example
├── biome.json         # konfiguracja lintera/formattera
├── tsconfig.json      # konfiguracja TypeScript 7 (strict, ESM NodeNext)
└── package.json
```

## Moduły

### Math

Moduł `src/module-01/math.ts` zawiera podstawowe operacje matematyczne:

| Funkcja | Opis | Przykład |
|---|---|---|
| `add(a, b)` | Dodawanie | `add(2, 3) // 5` |
| `subtract(a, b)` | Odejmowanie | `subtract(5, 3) // 2` |
| `multiply(a, b)` | Mnożenie | `multiply(4, 5) // 20` |
| `divide(a, b)` | Dzielenie | `divide(10, 2) // 5` |
| `power(a, b)` | Potęgowanie | `power(2, 3) // 8` |
| `modulo(a, b)` | Reszta z dzielenia | `modulo(10, 3) // 1` |

> ⚠️ `divide()` i `modulo()` rzucają błąd `Error` przy dzieleniu przez zero.

### PESEL

Moduł `src/module-01/pesel.ts` — walidacja, odczyt danych i generowanie numerów PESEL:

| Funkcja | Opis | Przykład |
|---|---|---|
| `validatePESEL(pesel)` | Walidacja formatu i sumy kontrolnej | `validatePESEL('44051401359') // true` |
| `getPESELInfo(pesel)` | Data urodzenia i płeć z numeru | `getPESELInfo('44051401359') // { birthDate: '1944-05-14', gender: 'male', ... }` |
| `generatePESEL(options)` | Generowanie z pełnych lub częściowych danych | `generatePESEL({ year: 1990, month: 5, day: 15, gender: 'female' })` |
| `generatePESELForDate(date, gender?)` | Generowanie z obiektu `Date` | `generatePESELForDate(new Date(1978, 0, 20), 'female')` |
| `calculateCheckDigit(first10)` | Cyfra kontrolna dla pierwszych 10 cyfr | `calculateCheckDigit('4405140135') // 9` |

Wszystkie pola `options` w `generatePESEL` są opcjonalne (`year`, `month`, `day`, `gender`) — brakujące wartości są losowane spójnie (np. 29 lutego bez podanego roku wybiera rok przestępny), a niemożliwe daty rzucają błąd.

## Testy

Projekt używa **Vitest** do testowania.

Uruchomienie testów:

```bash
npm test
```

Testy obejmują:
- Testy pozytywne dla wszystkich operacji
- Testy negatywne (NaN, Infinity, edge cases)

### Pokrycie kodu

```bash
npm run test:coverage
```

Raport tekstowy w terminalu, pełny raport HTML w `coverage/index.html` (katalog `coverage/` jest gitignored). Aktualny wynik: `math.ts` 100%, `pesel.ts` ~99% statementów (jedna nieosiągalna linia guarda).

## Narzędzia

- **TypeScript 7.0.2** — język, strict mode, nowoczesne opcje tsconfig
- **tsx** — uruchamianie TS bez kompilacji
- **Biome** — linter + formatter (zastępuje ESLint + Prettier)
- **Vitest** (+ `@vitest/coverage-v8`) — framework testowy i raporty pokrycia
- **@clack/prompts** — interaktywne menu w terminalu
- **zod** — walidacja schematów
- **@faker-js/faker** — generowanie danych testowych
- **npm-check-updates** — aktualizacja zależności
