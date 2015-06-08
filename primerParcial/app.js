var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Comentamos las siguiente lineas
//Estas fueron generadas por express-generator

//var routes = require('./routes/index');
//var users = require('./routes/users');
//hasta aqui lo comentado

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


/* Aqui puedo trabajar */



//Comentamos las siguientes lineas estos son generados
// por el express generator

//app.use('/', routes);
//app.use('/users', users);
//hasta aqui lo comentado

//app --> servidor web
/*
app es una instancia de express, un framework que ayuda
a facilitar la creación de un web server y de
declarar las rutas a las que este web server
responderá.

A diferencia de otros web servers como apache,
o Microsoft Internet Information Service, en
node.js cada ruta se debe registrar con funciones
auxiliares:
================================================================================
nombre   || firma                    ||  Explicación
================================================================================
    get  || app.get("ruta", handler) || recibe peticion HTTP por método get y
                                        si la peticion coincide con la ruta
                                        se ejecuta la funcion handler que puede
                                        definirse de forma anonima. Las funciones
                                        reciben dos parametros:
                                        req  ->  objeto con la petición y
                                                funciones para acceder a los
                                                parametros o valores en la url
                                                o como parte del query.
                                        res  -> objeto que tiene la respuesta
                                                a la petición funciones que permite
                                                establecer el estado de la respuesta
                                                el contenido o el renderizado de una
                                                vista.
    Ejemplos:
*/
// Al ejecutar http://hostname_or_ip:3000/
// esta función es la ruta que coincide.
app.get("/", function(req, res){
    res.send("Hola Mundo!");
} );



// Al ejecutar http://hostname_or_ip:3000/minombre
// esta función es la ruta que coincide.
app.get("/minombre", function(req,res){
    // La función reder utiliza un programa que devolverá la plantilla
    // ubicada en la carpeta views y un objeto json con todos los datos
    // que se substitullen en el contenido de la plantilla.
    // Con express se puede utilizar
    // varios plantilleros siendo los más famoso jade, handlebars, swig.
    // res.render("nombrePlantilla", {objeto json con los datos});
    res.render("miNombre", {"miNombre":"Orlando J."});
});

app.get("/roles",function(req,res){
  var roles = {"rol1":"Banquero","rol2":"Tecnico","rol3":"Electricista"};
  res.render("roles",roles);
});

// Ejercicio cree las siguiente rutas de acceso.
//============================================================
// miapellido
// nombreCompleto
// identidad


app.get("/mostrarperfil", function(req, res){
    //res.send("Hola Mundo!");
    res.render("perfil", {
      "nombre":"Jonathan",
      "apellido":"Oliva",
      "nombreCompleto":"Jonathan Benjamin Oliva Salinas",
      "email":"rutenio4416@hotmail.com",
      "profesion":"Ingeniero en Sistemas",
      "genero":"Masculino",
      "direccion":"Dept. Francisco Morazan, Tegucigalpa, Colonia Cerro Grande zona 4"});
} );


/* +++++++++++++++++++++*/
// catch 404 and forward to error handler


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
