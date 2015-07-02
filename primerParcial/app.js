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
});

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

//tarea resuelta
app.get("/mostrarperfil",function(req,res){
    // var perfil = {
    //     "primerNombre":"Orlando",
    //     "segundoNombre":"José",
    //     "apellidos":"Betancourth",
    //     "email":"obetancourthunicah@gmail.com",
    //     "genero":"Masculino",
    //     "direccion":"Tegucigalps",
    //     "profesion":"Ing.Ciencias de la Computación"
    // };

    //res.render("datospersonales",perfil);
    res.render("datospersonales", {
        "primerNombre":"Orlando",
        "segundoNombre":"José",
        "apellidos":"Betancourth",
        "email":"obetancourthunicah@gmail.com",
        "genero":"Masculino",
        "direccion":"Tegucigalps",
        "profesion":"Ing.Ciencias de la Computación",
        "roles":[
                    {"rol":"Administrador"},
                    {"rol":"Security Audit"}
                ]
    });
});

//Ejercicio 2
/*Por medio de un handler (manejador) get
eviaremos al cliente un formulario
y por handler post vamos a recibir
y procesar los datos del formulario.
*/
/*
para poder trabajar lo que hemos hecho hay que tener
nodejs
express generator
ssh*/

/*como se ejecuta un programa desarrollado con express?
node ./bin/www
*/

/*Uqe tipo de plantillero estamos usando con express generator?
handlebars*/
/*cual es el puerto por defecto que usan las aplicaciones generadas con generator?3000 y la que usa el ssh es 22*/

/*Con que metodo el servidor escuha una ruta get?
*/

app.get(
    "/editarperfil",
    function(req,res){
        var datos={
            "primerNombre" :"",
            "segundoNombre":""
        };
        res.render("editarperfil", datos);
    }
);
app.post(
    "/editarperfil",
    function(req,res){
        var datos={
            "primerNombre" :req.body.txtPrimerNombre,
            "segundoNombre":req.body.txtSegundoNombre,
            "mensaje": req.body.txtPrimerNombre + ' '
                     + req.body.txtSegundoNombre
        };
        res.render("editarperfil", datos);
    }
);

var datos  = {"productos":[
    {"codigo":"PRD01","nombre":"Panadol","precio":50,"stock":100},
    {"codigo":"PRD02","nombre":"Aciclovir","precio":70,"stock":20},
    {"codigo":"PRD03","nombre":"Augmentin ES","precio":390,"stock":10}
]};

app.get("/mostrarproductos", function(req,res){

    //console.log(datos);
    //res.send(datos);

    res.render("mostrarproductos",datos);
});

///producto?codigo=PRD01
app.get("/producto", function(req,res){
    var codigoProducto = req.query.codigo;
    //res.send("Se obtuvo el codigo " + codigoProducto + " del producto");
    //console.log(datos["productos"]);
    //res.send(datos["productos"][0]["codigo"]);
    //res.send(datos["productos"][0]["codigo"]);

    for (var i = 0; i < datos["productos"].length; i++) {
      if (datos["productos"][i]["codigo"]==codigoProducto) {
        res.render("producto",datos["productos"][i]);
      }
    }
});

///productos/PRD01 metodo REST
app.get("/productos/:codigo", function(req,res){
    var codigoProducto = req.params.codigo;
    res.send("Se obtuvo el codigo " + codigoProducto + " con REST");
});



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
/*
function esEmail(valor){
    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor))    {
        return false;
    }else{
        return true;
    }
}*/



app.get("/login",function(req,res) {
  var mensaje={"errores":""};
   res.render("login",mensaje);
});

app.post("/validar",function(req,res) {
  var loginData={
      "correo" :req.body.txtCorreo,
      "password":req.body.txtPassword,
      "errores": new Array()
  };
  var vista="validar";

  if (!esEmail(loginData["correo"])) {
    loginData["errores"].push({"error":"Escribio mal el formato del correo"});
    vista="login";
  }

  if (loginData["password"]!="lucario") {
    loginData["errores"].push({"error":"Escribio mal la contraseña"});
    vista="login";
  }

  res.render(vista,loginData);
});

function esEmail(valor){
    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor))    {
        return false;
    }else{
        return true;
    }
}

app.get("/ingresarPaciente",function(req,res){
  var datosPaciente={"nomPaciente":"",
                      "apePaciente":"",
                      "correoPaciente":"",
                      "telPaciente":"",
                      "errores":""
                      };

  res.render("ingresarPaciente", datosPaciente);
});

app.post("/ingresar_pre_clinica",function(req,res){
  var vista="ingresar_pre_clinica";
  var datosPaciente={"nomPaciente":req.body.txtNomPaciente,
                      "apePaciente":req.body.txtApePaciente,
                      "correoPaciente":req.body.txtEmailPaciente,
                      "telPaciente":req.body.txtTelPaciente,
                      "errores":new Array()
                      };

  if (datosPaciente["nomPaciente"]=="") {
    datosPaciente["errores"].push({"error":"El nombre del paciente lo dejo vacio"});
    vista="ingresarPaciente";
  }

  if (datosPaciente["apePaciente"]=="") {
    datosPaciente["errores"].push({"error":"El apellido del paciente lo dejo vacio"});
    vista="ingresarPaciente";
  }

  if (datosPaciente["correoPaciente"]=="") {
    datosPaciente["errores"].push({"error":"El correo del paciente lo dejo vacio"});
    vista="ingresarPaciente";
  }else if (!esEmail(datosPaciente["correoPaciente"])) {
    datosPaciente["errores"].push({"error":"El correo del paciente no posee formato valido"});
    vista="ingresarPaciente";
  }

  if (datosPaciente["telPaciente"]=="") {
    datosPaciente["errores"].push({"error":"El teléfono del paciente lo dejo vacio"});
    vista="ingresarPaciente";
  }

  res.render(vista, datosPaciente);
});

//programacion de negocios
var multer      =    require('multer');
var done        =    false;

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
   console.log('Rename esta dando');
    return filename;
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

app.get('/testDocumentos1',function(req,res){
      //var testData = {};
      res.render("testDocumentos1", null);
});

app.post('/testDocumentos1',function(req,res){
  var propiedades = req.files.archivo;
  if(done==true){
    console.log(req.files);
    res.send(propiedades);
    res.end("File uploaded.");
  }
  //res.render("propiedades", propiedades);
});

//p==========================================
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
