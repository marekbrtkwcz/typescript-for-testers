import consola from "consola";

let x = 10;
consola.log('🌍 X:', x);
{
    const x = 11;
    var y = 123;

    consola.log('🔒 X:', x);
    consola.log('🔒 Y:', y);
}
consola.log('🌍 X:', x);
consola.log('🌍 Y:', y);

x = 12;
consola.log('✏️ X:', x);