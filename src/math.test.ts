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
});
