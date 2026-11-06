import consola from 'consola';

const firstName = 'Marek';
const lastName = 'Testerski';

consola.log('👋 FirstName:', firstName);
console.log('👋 LastName:', lastName);

const fullName = firstName.concat(' ', lastName);
console.log('🔗 FullName:', fullName);

const fullName2 = firstName + ' '.repeat(1) + lastName;
console.log('➕ FullName:', fullName2);

const fullName3 = `${firstName} ${lastName}`;
console.log('📝 FullName:', fullName3);

// Zmiana wielkości znaków w stringach

const lowerFullName = fullName.toLowerCase();
console.log('⬇️ Lower FullName:', lowerFullName);
const upperFullName = fullName.toUpperCase();
console.log('⬆️ Upper FullName:', upperFullName);

// title case: pierwszy znak każdego wyrazu wielką literą, reszta mała
function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const titleFullName = toTitleCase('mARek tESTerski');
console.log('🔤 Title FullName:', titleFullName);
const titleFullName2 = toTitleCase(upperFullName);
console.log('🔤 Title FullName:', titleFullName2);

const textToChange = 'TypeScript is super boring!';

const textAfterChange = textToChange.replace('boring', 'COOL');

const textAfterChange2 = textAfterChange.replaceAll(' ', '📝');

consola.info('TextToChange:', textToChange);

consola.success('TextAfterChange', textAfterChange);
consola.success('TextAfterChange', textAfterChange2);

consola.info('Lenght text:', titleFullName.length);

const paddedString = titleFullName2.padStart(titleFullName2.length + 10, '>').padEnd(titleFullName2.length + 20, '<');
consola.success('Padded string:', paddedString);

const webTitle = '  Welcome to TypeScript Programming  ';
const webTitleWithoutSpaces = webTitle.trim();
consola.success('WebTitle:', webTitleWithoutSpaces);
