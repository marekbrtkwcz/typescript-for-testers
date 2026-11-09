import consola from "consola";


let myViewIsValid  = false;
consola.info('🔄 myViewIsValid before change:', myViewIsValid);
consola.info('✏️  --- ZMIANA WARTOŚCI ---');
myViewIsValid = true;
consola.info('✅ myViewIsValid after change:', myViewIsValid);