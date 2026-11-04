import { describe, expect, it } from 'vitest';

import { validatePESEL, getPESELInfo } from './pesel.js';

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
