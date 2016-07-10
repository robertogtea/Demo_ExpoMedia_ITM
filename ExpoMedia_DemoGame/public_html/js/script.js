var xFondo=0;
var xPersonaje=150;
var yPersonaje=415;
var xObstaculoUno=700;
var yObstaculoUno=415;

var estadoPersonaje="EnElPiso";
var jugando=true;

function jugar() {
  crearHilo();
}
function crearHilo() {
  Concurrent.Thread.create(hilo);
}
function hilo(){
  while (jugando===true) {
    dibujarFondoYMoverlo();
    dibujarPersonaje();
    dibujarObstaculos();
    verificarEstadoPersonaje();
    verificarColision();
    sleep(100);
  }
}

function verificarColision() {
  if(xObstaculoUno<(xPersonaje+20) && (xObstaculoUno+20>xPersonaje) && (yPersonaje+20>yObstaculoUno) )
  {
    window.alert("Colisión");
    //jugando=false;
  }
}
function verificarEstadoPersonaje() {

  //console.log(yPersonaje);
  if(estadoPersonaje==="Subiendo"){
    yPersonaje-=25;
  }
  if(yPersonaje<315)
  {
    estadoPersonaje="Bajando";
  }
  if(estadoPersonaje==="Bajando")
  {
    yPersonaje+=25;
  }
  if(yPersonaje>=415)
  {
    estadoPersonaje="EnElPiso";
  }
}
function dibujarFondoYMoverlo() {
  var areaJuego = document.getElementById("areaJuego");
  var contexto = areaJuego.getContext("2d");
  var fondo = new Image();
  fondo.src="images/fondo.jpg";
  contexto.drawImage(fondo,xFondo,0);
  xFondo-=10;
  //console.log(xFondo);
  if(xFondo<=-7000)
  {
    jugando=false;
    window.alert("Terminó");
  }
}
var b=true;
function dibujarPersonaje() {
  var areaJuego = document.getElementById("areaJuego");
  var contexto = areaJuego.getContext("2d");
  var personaje = new Image();
  if (b == true) {
    personaje.src="images/luigui.png";
  }
  else {
    personaje.src="images/luiguiback.png";
  }

  contexto.drawImage(personaje,xPersonaje,yPersonaje);

}

function dibujarObstaculos() {
  var areaJuego = document.getElementById("areaJuego");
  var contexto = areaJuego.getContext("2d");
  var obstaculo = new Image();
  obstaculo.src="images/luigui.png";
  contexto.drawImage(obstaculo,xObstaculoUno,yObstaculoUno);
  xObstaculoUno-=20;
}
function eventos() {
  //document.onkeypress = mostrarInformacionCaracter;
  document.onkeyup = escucharTeclasEspeciales;
  //document.onkeypress = escucharTeclasEspeciales;
}

function escucharEventosDelTeclado(evObject)
{

  var elCaracter = String.fromCharCode(evObject.which);
  if (evObject.which!=0 && evObject.which!=13)
  {
    msg = 'Tecla pulsada: ' + elCaracter;
  }
  else
  {
    msg = 'Pulsada tecla especial';
  }
    //console.log(msg);
}

function escucharTeclasEspeciales(evObject)
{
  var msg = '';
  var teclaPulsada = evObject.keyCode;

  if (teclaPulsada == 37)
  {
    xPersonaje-=5;
    b = false;

  }
  if (teclaPulsada == 38)
  {
    yPersonaje-=25;
  }
  if (teclaPulsada == 39)
  {
    xPersonaje+=5;
    b = true;
  }
  if (teclaPulsada == 40)
  {
    yPersonaje+=25;
  }
  if (teclaPulsada == 32)
  {
    estadoPersonaje="Subiendo";
  }
  //console.log(teclaPulsada);
}
