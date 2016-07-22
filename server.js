var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
   console.log('Server running on 8080...');
});

// cd navega hasta la carpeta 
// npm install connect serve-static - con esto se crea un servidor local
// pon este archivo en la raíz de la carpeta
// ejecuta en consola node server.js para arrancar el servidor
// una vez arrancado ir al navegador y tirar http://localhost:8080/path_to_the_index.html(si está en la carpeta raíz no hace falta poner nada más)