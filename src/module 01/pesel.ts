const PESSEL_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

export function validatePESEL(pesel: string): boolean {
  if (!pesel || typeof pesel !== 'string') return false;

  const cleaned = pesel.trim();

  if (!/^\d{11}$/.test(cleaned)) return false;

  if (cleaned === '00000000000') return false;

  const digits = cleaned.split('').map(Number);
  let sum = 0;

  for (const [i, digit] of digits.slice(0, 10).entries()) {
    sum += digit * (PESSEL_WEIGHTS[i] ?? 1);
  }

  const checkDigit = digits[10];
  const calculatedCheck = (10 - (sum % 10)) % 10;

  return checkDigit === calculatedCheck;
}

export function getPESELInfo(pesel: string): {
  valid: boolean;
  birthDate: string | null;
  gender: 'male' | 'female' | null;
} | null {
  if (!validatePESEL(pesel)) return null;

  const cleaned = pesel.trim();
  const year = Number(cleaned.substring(0, 2));
  const month = Number(cleaned.substring(2, 4));
  const day = Number(cleaned.substring(4, 6));
  const genderDigit = Number(cleaned.substring(9, 10));

  let fullYear = year;
  let adjustedMonth = month;

  if (month >= 80 && month <= 92) {
    fullYear = 1800 + year;
    adjustedMonth = month - 80;
  } else if (month >= 20 && month <= 32) {
    fullYear = 2000 + year;
    adjustedMonth = month - 20;
  } else if (month >= 40 && month <= 52) {
    fullYear = 2100 + year;
    adjustedMonth = month - 40;
  } else if (month >= 60 && month <= 72) {
    fullYear = 2200 + year;
    adjustedMonth = month - 60;
  } else {
    fullYear = 1900 + year;
  }

  const birthDate = `${fullYear}-${String(adjustedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const gender: 'male' | 'female' = genderDigit % 2 === 0 ? 'female' : 'male';

  return {
    valid: true,
    birthDate,
    gender,
  };
}

export type PESELGender = 'male' | 'female';

export interface GeneratePESELOptions {
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
  gender?: PESELGender | undefined;
}

const MIN_GENERATION_YEAR = 1900;

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1] ?? 31;
}

function centuryOffset(year: number): number {
  const century = Math.floor(year / 100);
  if (century === 18) return 80;
  if (century === 19) return 0;
  if (century === 20) return 20;
  if (century === 21) return 40;
  if (century === 22) return 60;
  throw new Error(`Unsupported year: ${year}`);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(from: number, to: number): number[] {
  const result: number[] = [];
  for (let i = from; i <= to; i++) result.push(i);
  return result;
}

function calculateCheckDigit(first10: string): number {
  let sum = 0;
  for (const [i, char] of first10.split('').entries()) {
    sum += Number(char) * (PESSEL_WEIGHTS[i] ?? 1);
  }
  return (10 - (sum % 10)) % 10;
}

export function generatePESEL(options: GeneratePESELOptions = {}): string {
  const { year, month, day, gender } = options;

  if (year !== undefined && (!Number.isInteger(year) || year < 1800 || year > 2299)) {
    throw new Error(`Invalid year: ${year}. Expected an integer between 1800 and 2299.`);
  }
  if (month !== undefined && (!Number.isInteger(month) || month < 1 || month > 12)) {
    throw new Error(`Invalid month: ${month}. Expected an integer between 1 and 12.`);
  }
  if (day !== undefined && (!Number.isInteger(day) || day < 1 || day > 31)) {
    throw new Error(`Invalid day: ${day}. Expected an integer between 1 and 31.`);
  }
  if (gender !== undefined && gender !== 'male' && gender !== 'female') {
    throw new Error(`Invalid gender: ${String(gender)}. Expected 'male' or 'female'.`);
  }

  const currentYear = new Date().getFullYear();
  const candidateYears = year !== undefined ? [year] : range(MIN_GENERATION_YEAR, currentYear);
  const candidateMonths = month !== undefined ? [month] : range(1, 12);

  const validDates: Array<{ year: number; month: number; maxDay: number }> = [];
  for (const y of candidateYears) {
    for (const m of candidateMonths) {
      const maxDay = daysInMonth(y, m);
      if (day !== undefined && day > maxDay) continue;
      validDates.push({ year: y, month: m, maxDay });
    }
  }

  const chosen = validDates[randomInt(0, validDates.length - 1)];
  if (!chosen) {
    throw new Error(
      `Invalid date: year=${year ?? 'any'}, month=${month ?? 'any'}, day=${day ?? 'any'} has no valid combination.`,
    );
  }

  const chosenDay = day ?? randomInt(1, chosen.maxDay);
  const chosenGender: PESELGender = gender ?? (randomInt(0, 1) === 0 ? 'male' : 'female');

  const yy = String(chosen.year % 100).padStart(2, '0');
  const mm = String(chosen.month + centuryOffset(chosen.year)).padStart(2, '0');
  const dd = String(chosenDay).padStart(2, '0');

  const serialPrefix = String(randomInt(0, 999)).padStart(3, '0');
  const genderDigit = chosenGender === 'male' ? randomInt(0, 4) * 2 + 1 : randomInt(0, 4) * 2;

  const first10 = `${yy}${mm}${dd}${serialPrefix}${genderDigit}`;
  return first10 + String(calculateCheckDigit(first10));
}

export function generatePESELForDate(date: Date, gender?: PESELGender | undefined): string {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error('Invalid date.');
  }
  return generatePESEL({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    gender,
  });
}
