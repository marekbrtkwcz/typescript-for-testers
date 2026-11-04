import { describe, expect, it } from 'vitest';

import { add, subtract, multiply, divide, power, modulo } from './math.js';

describe('kalkulator', () => {
  it('dodaje dwie liczby', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('mnoży dwie liczby', () => {
    expect(multiply(4, 5)).toBe(20);
  });

  it('obsługuje liczby ujemne', () => {
    expect(add(-1, -1)).toBe(-2);
  });

  it('odejmuje dwie liczby', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('odejmuje z wynikiem ujemnym', () => {
    expect(subtract(3, 5)).toBe(-2);
  });

  it('dzieli dwie liczby', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('dzieli z wynikiem zmiennoprzecinkowym', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it('rzuca błąd przy dzieleniu przez zero', () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  it('potęguje liczby', () => {
    expect(power(2, 3)).toBe(8);
  });

  it('potęguje do potęgi zero', () => {
    expect(power(5, 0)).toBe(1);
  });

  it('oblicza modulo', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  it('rzuca błąd przy modulo przez zero', () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero");
  });

  it('potęguje z ujemnym wykładnikiem', () => {
    expect(power(2, -1)).toBe(0.5);
  });

  it('modulo z ujemną liczbą', () => {
    expect(modulo(-10, 3)).toBe(-1);
  });
});

describe('kalkulator - testy negatywne', () => {
  it('dodawanie z NaN zwraca NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
  });

  it('odejmowanie z NaN zwraca NaN', () => {
    expect(subtract(NaN, 5)).toBeNaN();
    expect(subtract(5, NaN)).toBeNaN();
  });

  it('mnożenie z NaN zwraca NaN', () => {
    expect(multiply(NaN, 5)).toBeNaN();
    expect(multiply(5, NaN)).toBeNaN();
  });

  it('dzielenie z NaN zwraca NaN', () => {
    expect(divide(NaN, 5)).toBeNaN();
    expect(divide(5, NaN)).toBeNaN();
  });

  it('potęgowanie z NaN zwraca NaN', () => {
    expect(power(NaN, 2)).toBeNaN();
    expect(power(2, NaN)).toBeNaN();
  });

  it('modulo z NaN zwraca NaN', () => {
    expect(modulo(NaN, 5)).toBeNaN();
    expect(modulo(5, NaN)).toBeNaN();
  });

  it('dodawanie z Infinity', () => {
    expect(add(Infinity, 5)).toBe(Infinity);
    expect(add(-Infinity, 5)).toBe(-Infinity);
  });

  it('dzielenie przez Infinity zwraca 0', () => {
    expect(divide(10, Infinity)).toBe(0);
  });

  it('dzielenie Infinity przez liczbę zwraca Infinity', () => {
    expect(divide(Infinity, 5)).toBe(Infinity);
  });

  it('potęgowanie z zerem do potęgi ujemnej zwraca Infinity', () => {
    expect(power(0, -1)).toBe(Infinity);
  });

  it('modulo z Infinity', () => {
    expect(modulo(10, Infinity)).toBe(10);
    expect(modulo(Infinity, 10)).toBeNaN();
  });
});
