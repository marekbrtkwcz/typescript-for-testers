import consola from 'consola';

const firstName = 'Marek';
const age = new Date().getFullYear() - 1972;
const isAdult = age > 18;

interface Person {
  firstName: string;
  age: number;
  isAdult: boolean;
}

const person: Person = { firstName, age, isAdult };

/**
 * Wypisuje w konsoli dane użytkownika.
 *
 * Przeciążenia — jedna nazwa funkcji, dwa sposoby wywołania:
 * @param userName - imię użytkownika do wyświetlenia
 * @param userAge - wiek użytkownika w latach
 * @param userIsAdult - czy użytkownik jest pełnoletni
 */
function printUserInfo(userName: string, userAge: number, userIsAdult: boolean): void;
/**
 * Wypisuje w konsoli dane użytkownika na podstawie obiektu.
 * @param person - obiekt z danymi użytkownika
 */
function printUserInfo(person: Person): void;
function printUserInfo(userNameOrPerson: string | Person, userAge?: number, userIsAdult?: boolean): void {
  if (typeof userNameOrPerson === 'string') {
    consola.info('👤 FirstName:', userNameOrPerson);
    consola.info('🎂 Age:', userAge);
    consola.info('🧑‍⚖️ Is Adult:', userIsAdult);
    return;
  }
  printUserInfo(userNameOrPerson.firstName, userNameOrPerson.age, userNameOrPerson.isAdult);
}

printUserInfo(firstName, age, isAdult);
printUserInfo(person);
