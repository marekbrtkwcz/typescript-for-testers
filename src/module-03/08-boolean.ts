import consola from "consola";


let myViewIsValid  = false;
consola.info('🔄 myViewIsValid before change:', myViewIsValid);
consola.info('✏️  --- ZMIANA WARTOŚCI ---');
myViewIsValid = true;
consola.info('✅ myViewIsValid after change:', myViewIsValid);

const a = true;
const b = false;

// Konkretny przykład De Morgana na zmiennych a i b:
consola.info('!(a && b) =', !(a && b), '| !a || !b =', !a || !b);

// ---------------------------------------------------------------------------
// PRAWA ALGEBRY BOOLE'A — każde prawo sprawdzamy dla wszystkich kombinacji
// wartości a i b. Jeśli prawa strona == lewa strona dla każdego przypadku,
// prawo jest prawdziwe.
// ---------------------------------------------------------------------------

// Wszystkie kombinacje (a, b): (true,true), (true,false), (false,true), (false,false)
const kombinacje: Array<[boolean, boolean]> = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
];

// Pomocnik: sprawdza prawo dla wszystkich kombinacji i loguje wynik
function sprawdzPrawo(nazwa: string, lewa: boolean[], prawa: boolean[]): void {
  const zawszeRowne = lewa.every((wartosc, i) => wartosc === prawa[i]);
  consola.info(`📐 ${nazwa}:`, zawszeRowne);
  if (!zawszeRowne) {
    kombinacje.forEach(([x, y], i) => {
      consola.warn(`   a=${x}, b=${y} → lewa=${lewa[i]}, prawa=${prawa[i]}`);
    });
  }
}

// 1. Prawa De Morgana
//    !(a && b) === (!a || !b)
//    !(a || b) === (!a && !b)
sprawdzPrawo(
  'De Morgan 1:  !(a && b) === (!a || !b)',
  kombinacje.map(([x, y]) => !(x && y)),
  kombinacje.map(([x, y]) => !x || !y),
);
sprawdzPrawo(
  'De Morgan 2:  !(a || b) === (!a && !b)',
  kombinacje.map(([x, y]) => !(x || y)),
  kombinacje.map(([x, y]) => !x && !y),
);

// 2. Podwójne negowanie (inwolucja)
//    !!a === a
sprawdzPrawo(
  'Podwójne negowanie:  !!a === a',
  kombinacje.map(([x]) => !!x),
  kombinacje.map(([x]) => x),
);

// 3. Prawa idempotencji
//    (a && a) === a
//    (a || a) === a
sprawdzPrawo(
  'Idempotencja &&:  (a && a) === a',
  kombinacje.map(([x]) => x && x),
  kombinacje.map(([x]) => x),
);
sprawdzPrawo(
  'Idempotencja ||:  (a || a) === a',
  kombinacje.map(([x]) => x || x),
  kombinacje.map(([x]) => x),
);

// 4. Prawo wyłączonego środka i prawo sprzeczności
//    (a || !a) === true   (wyłączony środek)
//    (a && !a) === false  (sprzeczność)
sprawdzPrawo(
  'Wyłączony środek:  (a || !a) === true',
  kombinacje.map(([x]) => x || !x),
  kombinacje.map(() => true),
);
sprawdzPrawo(
  'Sprzeczność:  (a && !a) === false',
  kombinacje.map(([x]) => x && !x),
  kombinacje.map(() => false),
);

// 5. Prawa zerowania (dominacji)
//    (a && false) === false
//    (a || true)  === true
sprawdzPrawo(
  'Zerowanie &&:  (a && false) === false',
  kombinacje.map(([x]) => x && false),
  kombinacje.map(() => false),
);
sprawdzPrawo(
  'Zerowanie ||:  (a || true) === true',
  kombinacje.map(([x]) => x || true),
  kombinacje.map(() => true),
);

// 6. Elementy neutralne
//    (a && true) === a
//    (a || false) === a
sprawdzPrawo(
  'Neutralność &&:  (a && true) === a',
  kombinacje.map(([x]) => x && true),
  kombinacje.map(([x]) => x),
);
sprawdzPrawo(
  'Neutralność ||:  (a || false) === a',
  kombinacje.map(([x]) => x || false),
  kombinacje.map(([x]) => x),
);

// 7. Prawa przemienności
//    (a && b) === (b && a)
//    (a || b) === (b || a)
sprawdzPrawo(
  'Przemiennność &&:  (a && b) === (b && a)',
  kombinacje.map(([x, y]) => x && y),
  kombinacje.map(([x, y]) => y && x),
);
sprawdzPrawo(
  'Przemiennność ||:  (a || b) === (b || a)',
  kombinacje.map(([x, y]) => x || y),
  kombinacje.map(([x, y]) => y || x),
);

// 8. Prawa rozdzielności
//    (a && (b || c)) === ((a && b) || (a && c))
//    (a || (b && c)) === ((a || b) && (a || c))
const c = true; // trzecia zmienna, np. c = true
sprawdzPrawo(
  'Rozdzielność && nad ||:  a && (b || c) === (a && b) || (a && c)',
  kombinacje.map(([x, y]) => x && (y || c)),
  kombinacje.map(([x, y]) => (x && y) || (x && c)),
);
sprawdzPrawo(
  'Rozdzielność || nad &&:  a || (b && c) === (a || b) && (a || c)',
  kombinacje.map(([x, y]) => x || (y && c)),
  kombinacje.map(([x, y]) => (x || y) && (x || c)),
);

// 9. Prawa absorpcji
//    (a && (a || b)) === a
//    (a || (a && b)) === a
sprawdzPrawo(
  'Absorpcja &&:  (a && (a || b)) === a',
  kombinacje.map(([x, y]) => x && (x || y)),
  kombinacje.map(([x]) => x),
);
sprawdzPrawo(
  'Absorpcja ||:  (a || (a && b)) === a',
  kombinacje.map(([x, y]) => x || (x && y)),
  kombinacje.map(([x]) => x),
);

