import { describe, expect, it } from 'vitest';

import { add, multiply } from './math.js';

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
});
