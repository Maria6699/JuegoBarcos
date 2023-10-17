const fs = require('fs');
//express.js
const express = require('express');
const app = express();

//socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const passport=require("passport");

const PORT = process.env.PORT || 3001;
const modelo = require ("./servidor/modelo.js");
const sWS = require("./servidor/servidorWS.js");
var args = process.argv.slice(2);

let juego = new modelo.Juego(args[0]);
let servidorWS = new sWS.ServidorWS();

const cookieSession=require("cookie-session");

require("./servidor/passport-setup.js");

app.use(cookieSession({
  name: 'Batalla Naval',
  keys: ['key1', 'key2']
}));

app.use(express.static(__dirname + "/"));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(request,response){
	let contenido=fs.readFileSync(__dirname+"/cliente/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});


app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));


//"auth/github"
//"auth/twitter"
//...

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fallo' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
});
app.get("/good", function(request,response){
  //var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
  var nick=request.user.emails[0].value;
  if (nick){
    juego.agregarUsuario(nick,true);
  }
  //console.log(request.user.emails[0].value);  
  response.cookie('nick',nick);
  response.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/goodFacebook');
  });


  app.get("/goodFacebook", function (request, response) {
    let nick = request.user.displayName;
    if (nick) {
        juego.agregarUsuario(nick);
    }
    response.cookie('nick', nick);
    response.redirect('/');
});

app.get("/fallo",function(request,response){
  response.send({nick:"nook"})
})


app.get("/agregarUsuario/:nick",function(request,response){
  let nick = request.params.nick;
  let res;
  res=juego.agregarUsuario(nick);
  response.send(res);
});

app.get("/comprobarUsuario/:nick",function(request,response){
  let nick=request.params.nick;
  let us=juego.obtenerUsuario(nick);
  let res = { "nick": -1 };
  if(us){
    res.nick=us.nick;
  }
  response.send(res);
})

app.get("/crearPartida/:nick",function(request,response){
  let nick = request.params.nick;
  let res = juego.jugadorCreaPartida(nick);

  response.send(res);
});

app.get("/unirseAPartida/:nick/:codigo",function(request,response){
  let nick = request.params.nick;
  let codigo = request.params.codigo;
  let res = juego.jugadorSeUneAPartida(nick,codigo)
  response.send(res);
})

app.get("/obtenerPartidas",function(request,response){

  let lista = juego.obtenerPartidas();
  
  response.send(lista);
})

app.get("/obtenerPartidasDisponibles",function(request,response){

  let lista = juego.obtenerPartidasDisponibles();
  
  response.send(lista);
})

app.get("/salir/:nick",function(request,response){

  let nick = request.params.nick;

  cod=juego.usuarioSale(nick);
  //console.log(cod,"index.js")
  
  response.send({res:"ok",codigo:cod});
});

app.get("/obtenerLogs",function(request,response){
  juego.obtenerLogs(function(logs){
    response.send(logs);
  })
});

// Start the server, antes con app, ahora con sockets con server.listen
/*app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});*/

server.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
  console.log('Press Ctrl+C para salir.');
});
// [END gae_flex_quickstart]

//lanzar servidor
servidorWS.lanzarServidorWS(io,juego);