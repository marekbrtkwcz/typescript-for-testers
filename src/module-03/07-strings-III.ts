import consola from 'consola';

// sprawdzenie zawartości
const email = 'marek.tester@testuj.pl';
const isValidEmail = email.includes('@');
consola.info('Is valid email:', isValidEmail);
consola.info('Starts with:', email.startsWith('marek'));
consola.info('Ends with:', email.endsWith('marek'));
consola.info('Ends with:', email.endsWith('com'));
