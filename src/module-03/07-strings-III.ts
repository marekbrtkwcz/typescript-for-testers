import consola from 'consola';

// sprawdzenie zawartości
const email = 'marek.tester@testuj.pl';
const isValidEmail = email.includes('@');
consola.info('Is valid email:', isValidEmail);
consola.info('Starts with:', email.startsWith('marek'));
consola.info('Ends with:', email.endsWith('marek'));
consola.info('Ends with:', email.endsWith('com'));

const testText = 'Test and check, no room for bugs, smooth releases, happy hugs!';
consola.log(testText);
const textToSearch = 'bugs';
consola.info('Text to search:', testText.search(textToSearch));
consola.info('Text to search:', testText.toUpperCase().search(/bugs/i));
consola.info('Text to search:', testText.toUpperCase().search(/ugs/gi));

// wszystkie pozycje wystąpień (string lub regex)
const searchAll = (text: string, pattern: string | RegExp): number[] => {
  const regex =
    pattern instanceof RegExp
      ? new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`)
      : new RegExp(pattern, 'g');
  const positions: number[] = [];
  let match: RegExpExecArray | null = regex.exec(text);
  while (match !== null) {
    positions.push(match.index);
    if (match[0].length === 0) regex.lastIndex++;
    match = regex.exec(text);
  }
  return positions;
};

consola.info('searchAll:', searchAll(testText, 'happy'));
consola.info('searchAll regex:', searchAll(testText, /ugs/g));
consola.info('searchAll regex:', searchAll(testText.toUpperCase(), /ugs/gi));

// wycinanie tekstu
consola.info(testText.slice());
consola.info(testText.slice(0));

consola.info(testText.slice(0, 13));
consola.info(testText.slice(0, 14));

consola.info(testText.slice(-5)); // 'hugs!'
consola.info(testText.slice(0, -6)); // 'Test and check, no room for bugs, smooth releases, happy'
consola.info(testText.slice(-10, -6)); // 'appy'

consola.info(testText.substring(0));

consola.info(testText.substring(0, 13));
consola.info(testText.substring(0, 14));

consola.info(testText.substring(-5)); // 'hugs!'
consola.info(testText.substring(0, -6)); // 'Test and check, no room for bugs, smooth releases, happy'
consola.info(testText.substring(-10, -6)); // 'appy'

// dzielenie wyrazów

consola.info(testText.split(''));
consola.info(testText.split(' '));

// pozycja znaku
consola.info('indexOf:', email.indexOf('@'));
consola.info('lastindexOf:', email.lastIndexOf('@'));

consola.info('indexOf:', email.indexOf('.'));
consola.info('lastindexOf:', email.lastIndexOf('.'));