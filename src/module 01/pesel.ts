const PESSEL_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

export function validatePESEL(pesel: string): boolean {
  if (!pesel || typeof pesel !== 'string') return false;

  const cleaned = pesel.trim();

  if (!/^\d{11}$/.test(cleaned)) return false;

  if (cleaned === '00000000000') return false;

  const digits = cleaned.split('').map(Number);
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * PESSEL_WEIGHTS[i];
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
