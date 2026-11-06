import consola from 'consola';

/**
 * Enum kolorów — pod spodem zwykły obiekt z wartościami liczbowymi (0, 1, 2...).
 * Dołożone człony rosną automatycznie bez jawnego przypisania.
 */
enum Color {
  Red,
  Green,
  Blue,
  Yellow, // 3
  Orange, // 4
  Purple, // 5
  Black, // 6
  White, // 7
}

/**
 * Enum ze zdefiniowanymi wartościami — wartości nie muszą być liczbami.
 */
enum HexColor {
  Red = '#ff0000',
  Green = '#00ff00',
  Blue = '#0000ff',
  Yellow = '#ffff00',
  Orange = '#ffa500',
  Purple = '#800080',
  Black = '#000000',
  White = '#ffffff',
}

const favoriteColor: Color = Color.Green;
const anotherColor: Color = Color.White;

consola.info('🔢 Favorite Color:', favoriteColor); // 1 — pozycja w enumie liczbowym
consola.info('🔤 Color Name:', Color[favoriteColor]); // odwrotne mapowanie: z wartości na nazwę
consola.info('🔢 Another Color:', anotherColor, '→', Color[anotherColor], '(7 — ostatni człon)');

consola.info('🎨 Red Hex:', HexColor.Red);
consola.info('🎨 White Hex:', HexColor.White);

// Enum pod spodem to zwykły obiekt — można go podejrzeć:
consola.info('📦 Color as object:', Color);

/**
 * Wartości mogą być wyliczane (computed) — kolejne człony potrzebują jawnego startu.
 * Można je też łączyć operacjami bitowymi.
 */
enum Priority {
  Low = 1 << 0, // 1
  Medium = 1 << 1, // 2
  High = 1 << 2, // 4
  Critical = Low | Medium | High, // 7
}

consola.info('⚡ Priority.Critical:', Priority.Critical);

/**
 * Enum działa świetnie z switch — kompilator pilnuje wyczerpania przypadków.
 * Gdy dodamy nowy człon, a obsłużymy wszystkie, `never` wyłapie brakującą gałąź.
 */
function label(color: Color): string {
  switch (color) {
    case Color.Red:
      return 'czerwony';
    case Color.Green:
      return 'zielony';
    case Color.Blue:
      return 'niebieski';
    case Color.Yellow:
      return 'żółty';
    case Color.Orange:
      return 'pomarańczowy';
    case Color.Purple:
      return 'fioletowy';
    case Color.Black:
      return 'czarny';
    case Color.White:
      return 'biały';
    default: {
      const neverColor: never = color; // błąd kompilacji, jeśli enum urósł
      throw new Error(`Nieznany kolor: ${neverColor}`);
    }
  }
}

consola.info('🏷️  Label:', label(favoriteColor));

/**
 * Nowoczesna alternatywa: obiekt `as const` + typ Union.
 * Zero kodu w runtime, lepsze tree-shaking — często preferowane nad enum.
 * zob. https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
 */
const LEVELS = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
} as const;

type Level = (typeof LEVELS)[keyof typeof LEVELS];

const logLevel: Level = LEVELS.warn;
consola.info('📊 Level:', logLevel);
