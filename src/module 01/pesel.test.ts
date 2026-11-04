import { describe, expect, it } from 'vitest';

import { generatePESEL, generatePESELForDate, getPESELInfo, validatePESEL } from './pesel.js';

describe('PESEL validation', () => {
  describe('positive tests', () => {
    it('validates correct PESEL from 1900s', () => {
      expect(validatePESEL('44051401359')).toBe(true);
    });

    it('validates correct PESEL from 2000s', () => {
      expect(validatePESEL('02240202352')).toBe(true);
    });

    it('validates correct PESEL from 2100s', () => {
      expect(validatePESEL('44410402359')).toBe(true);
    });

    it('validates correct PESEL from 1800s', () => {
      expect(validatePESEL('84880802352')).toBe(true);
    });

    it('validates correct PESEL from 2200s', () => {
      expect(validatePESEL('64700202351')).toBe(true);
    });

    it('validates PESEL with spaces', () => {
      expect(validatePESEL(' 44051401359 ')).toBe(true);
    });

    it('validates another correct PESEL', () => {
      expect(validatePESEL('50051401350')).toBe(true);
    });

    it('validates PESEL with check digit 0', () => {
      expect(validatePESEL('00210100035')).toBe(true);
    });
  });

  describe('negative tests', () => {
    it('rejects empty string', () => {
      expect(validatePESEL('')).toBe(false);
    });

    it('rejects null', () => {
      expect(validatePESEL(null as unknown as string)).toBe(false);
    });

    it('rejects undefined', () => {
      expect(validatePESEL(undefined as unknown as string)).toBe(false);
    });

    it('rejects non-string input', () => {
      expect(validatePESEL(12345678901 as unknown as string)).toBe(false);
    });

    it('rejects PESEL with letters', () => {
      expect(validatePESEL('4405140135A')).toBe(false);
    });

    it('rejects PESEL too short', () => {
      expect(validatePESEL('4405140135')).toBe(false);
    });

    it('rejects PESEL too long', () => {
      expect(validatePESEL('440514013591')).toBe(false);
    });

    it('rejects PESEL with invalid check digit', () => {
      expect(validatePESEL('44051401358')).toBe(false);
    });

    it('rejects PESEL with special characters', () => {
      expect(validatePESEL('4405140135-')).toBe(false);
    });

    it('rejects PESEL with spaces in middle', () => {
      expect(validatePESEL('44 051401359')).toBe(false);
    });

    it('rejects all zeros', () => {
      expect(validatePESEL('00000000000')).toBe(false);
    });

    it('rejects PESEL with only spaces', () => {
      expect(validatePESEL('           ')).toBe(false);
    });
  });
});

describe('PESEL info extraction', () => {
  describe('positive tests', () => {
    it('extracts birth date from 1900s', () => {
      const info = getPESELInfo('44051401359');
      expect(info).not.toBeNull();
      expect(info?.valid).toBe(true);
      expect(info?.birthDate).toBe('1944-05-14');
    });

    it('extracts gender male', () => {
      const info = getPESELInfo('44051401359');
      expect(info?.gender).toBe('male');
    });

    it('extracts gender female', () => {
      const info = getPESELInfo('44051401342');
      expect(info?.gender).toBe('female');
    });

    it('extracts birth date from 2000s', () => {
      const info = getPESELInfo('02240202352');
      expect(info?.birthDate).toBe('2002-04-02');
    });

    it('extracts birth date from 2100s', () => {
      const info = getPESELInfo('44410402359');
      expect(info?.birthDate).toBe('2144-01-04');
    });

    it('extracts birth date from 1800s', () => {
      const info = getPESELInfo('84880802352');
      expect(info?.birthDate).toBe('1884-08-08');
    });

    it('extracts birth date from 2200s', () => {
      const info = getPESELInfo('64700202351');
      expect(info?.birthDate).toBe('2264-10-02');
    });

    it('returns null for invalid PESEL', () => {
      expect(getPESELInfo('12345678901')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(getPESELInfo('')).toBeNull();
    });

    it('returns null for null', () => {
      expect(getPESELInfo(null as unknown as string)).toBeNull();
    });
  });

  describe('negative tests', () => {
    it('returns null for PESEL with invalid check digit', () => {
      expect(getPESELInfo('44051401358')).toBeNull();
    });

    it('returns null for PESEL too short', () => {
      expect(getPESELInfo('4405140135')).toBeNull();
    });

    it('returns null for PESEL with letters', () => {
      expect(getPESELInfo('4405140135A')).toBeNull();
    });

    it('returns null for non-string input', () => {
      expect(getPESELInfo(12345678901 as unknown as string)).toBeNull();
    });
  });
});

describe('PESEL generation', () => {
  describe('positive tests', () => {
    it('generates a valid 11-digit PESEL for full date and gender', () => {
      const pesel = generatePESEL({ year: 1990, month: 5, day: 15, gender: 'male' });
      expect(pesel).toHaveLength(11);
      expect(validatePESEL(pesel)).toBe(true);
    });

    it('round-trips birth date and gender through getPESELInfo', () => {
      const pesel = generatePESEL({ year: 1990, month: 5, day: 15, gender: 'female' });
      const info = getPESELInfo(pesel);
      expect(info?.birthDate).toBe('1990-05-15');
      expect(info?.gender).toBe('female');
    });

    it('encodes male as odd 10th digit and female as even', () => {
      const male = generatePESEL({ year: 2000, month: 1, day: 1, gender: 'male' });
      const female = generatePESEL({ year: 2000, month: 1, day: 1, gender: 'female' });
      expect(Number(male[9]) % 2).toBe(1);
      expect(Number(female[9]) % 2).toBe(0);
    });

    it('supports year only', () => {
      for (let i = 0; i < 50; i++) {
        const info = getPESELInfo(generatePESEL({ year: 1985 }));
        expect(info?.birthDate?.startsWith('1985-')).toBe(true);
      }
    });

    it('supports month only', () => {
      for (let i = 0; i < 50; i++) {
        const info = getPESELInfo(generatePESEL({ month: 7 }));
        expect(Number(info?.birthDate?.split('-')[1])).toBe(7);
      }
    });

    it('supports day only', () => {
      for (let i = 0; i < 50; i++) {
        const info = getPESELInfo(generatePESEL({ day: 31 }));
        expect(Number(info?.birthDate?.split('-')[2])).toBe(31);
      }
    });

    it('supports gender only', () => {
      for (let i = 0; i < 50; i++) {
        const info = getPESELInfo(generatePESEL({ gender: 'female' }));
        expect(info?.gender).toBe('female');
      }
    });

    it('generates a valid PESEL with no options at all', () => {
      for (let i = 0; i < 50; i++) {
        expect(validatePESEL(generatePESEL())).toBe(true);
      }
    });

    it('supports partial year and month', () => {
      const info = getPESELInfo(generatePESEL({ year: 2001, month: 12 }));
      expect(info?.birthDate?.startsWith('2001-12-')).toBe(true);
    });

    it('supports Feb 29 when year is not given (picks a leap year)', () => {
      for (let i = 0; i < 50; i++) {
        const info = getPESELInfo(generatePESEL({ month: 2, day: 29 }));
        expect(info?.birthDate?.endsWith('-02-29')).toBe(true);
      }
    });

    it('handles leap day in a leap year', () => {
      const info = getPESELInfo(generatePESEL({ year: 2000, month: 2, day: 29 }));
      expect(info?.birthDate).toBe('2000-02-29');
    });

    it('encodes 2000s with month offset +20', () => {
      const pesel = generatePESEL({ year: 2005, month: 3, day: 3 });
      expect(pesel.substring(2, 4)).toBe('23');
      expect(getPESELInfo(pesel)?.birthDate).toBe('2005-03-03');
    });

    it('encodes 1800s with month offset +80', () => {
      const pesel = generatePESEL({ year: 1899, month: 8, day: 8 });
      expect(pesel.substring(2, 4)).toBe('88');
      expect(getPESELInfo(pesel)?.birthDate).toBe('1899-08-08');
    });

    it('generatePESELForDate uses the Date parts', () => {
      const info = getPESELInfo(generatePESELForDate(new Date(1985, 11, 25), 'male'));
      expect(info?.birthDate).toBe('1985-12-25');
      expect(info?.gender).toBe('male');
    });
  });

  describe('negative tests', () => {
    it('throws for invalid month', () => {
      expect(() => generatePESEL({ month: 13 })).toThrow('Invalid month');
    });

    it('throws for invalid day', () => {
      expect(() => generatePESEL({ day: 0 })).toThrow('Invalid day');
    });

    it('throws for out-of-range year', () => {
      expect(() => generatePESEL({ year: 1700 })).toThrow('Invalid year');
    });

    it('throws for invalid gender', () => {
      expect(() => generatePESEL({ gender: 'other' as unknown as 'male' })).toThrow('Invalid gender');
    });

    it('throws for non-existing date like Feb 30', () => {
      expect(() => generatePESEL({ month: 2, day: 30 })).toThrow('Invalid date');
    });

    it('throws for Feb 29 in a non-leap year', () => {
      expect(() => generatePESEL({ year: 2023, month: 2, day: 29 })).toThrow('Invalid date');
    });

    it('throws for invalid Date in generatePESELForDate', () => {
      expect(() => generatePESELForDate(new Date('not a date'))).toThrow('Invalid date');
    });
  });
});
