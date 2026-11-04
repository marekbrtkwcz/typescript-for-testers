import consola from 'consola';

const firstName: string = 'Marek';
const lastName: string = 'Testerski';
const age: number = 54;

console.clear();
consola.log('Hello from TypeScript');

const fullName: string = `${firstName} ${lastName}`.toUpperCase();

consola.success('Your fullName: ', fullName, 'age:', age);
consola.info('Your fullName: ', fullName, 'age:', age);
