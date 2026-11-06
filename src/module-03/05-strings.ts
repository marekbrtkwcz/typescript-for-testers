import consola from "consola";

const firstName = "Marek"
const lastName = "Testerski";
const single = 'single string';
const double = "double string";
const template = `${firstName} ${lastName}`;

const multiline  = `This is 
multililine
string`

consola.log('👤 FirstName:', firstName);
consola.log('👤 LastName:', lastName);
consola.log('🔤 Single quotes:', single);
consola.log('🔤 Double quotes:', double);
consola.log('🧵 Template literal:', template);
consola.log('📄 Multiline string:', multiline);
