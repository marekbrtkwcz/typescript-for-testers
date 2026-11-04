import { describe, expect, it } from 'vitest';

import { addTwoNumbers } from './addTwoNumbers.js';

describe('addTwoNumbers', () => {
  it('dodaje dwie liczby dodatnie', () => {
    expect(addTwoNumbers(5, 10)).toBe(15);
  });

  it('dodaje dwie liczby ujemne', () => {
    expect(addTwoNumbers(-3, -7)).toBe(-10);
  });

  it('dodaje liczbę dodatnią i ujemną', () => {
    expect(addTwoNumbers(10, -4)).toBe(6);
  });

  it('dodaje zero', () => {
    expect(addTwoNumbers(0, 8)).toBe(8);
    expect(addTwoNumbers(8, 0)).toBe(8);
  });

  it('dodaje liczby zmiennoprzecinkowe', () => {
    expect(addTwoNumbers(1.5, 2.25)).toBe(3.75);
  });

  it('dodaje liczby zmiennoprzecinkowe z błędem precyzji', () => {
    expect(addTwoNumbers(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it('zwraca NaN, gdy którykolwiek argument to NaN', () => {
    expect(addTwoNumbers(NaN, 5)).toBeNaN();
    expect(addTwoNumbers(5, NaN)).toBeNaN();
  });

  it('dodaje Infinity', () => {
    expect(addTwoNumbers(Infinity, 5)).toBe(Infinity);
    expect(addTwoNumbers(-Infinity, 5)).toBe(-Infinity);
  });
});
