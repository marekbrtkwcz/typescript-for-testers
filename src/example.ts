import { consola } from 'consola';

import { add, subtract, multiply, divide, power, modulo } from './math.js';

consola.info('typescript-for-testers - przykładowe użycie modułu math');

const a = 10;
const b = 5;

consola.start('Operacje matematyczne:');
consola.log(`Dodawanie: ${a} + ${b} = ${add(a, b)}`);
consola.log(`Odejmowanie: ${a} - ${b} = ${subtract(a, b)}`);
consola.log(`Mnożenie: ${a} * ${b} = ${multiply(a, b)}`);
consola.log(`Dzielenie: ${a} / ${b} = ${divide(a, b)}`);
consola.log(`Potęgowanie: ${a} ** ${b} = ${power(a, b)}`);
consola.log(`Modulo: ${a} % ${b} = ${modulo(a, b)}`);

consola.success('Wszystkie operacje zakończone pomyślnie!');
