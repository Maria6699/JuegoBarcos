let modelo=require("./modelo.js");

const SIZE = 10

describe("El juego...", function() {
  var miJuego;
  var us1,us2,partida;

  beforeEach(function() {   //Se ejecuta antes de cada bloque it
    miJuego=new modelo.Juego(true);
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    let res=miJuego.jugadorCreaPartida("pepe");
    miJuego.jugadorSeUneAPartida("luis",res.codigo);
    us1=miJuego.obtenerUsuario("pepe");
    us2=miJuego.obtenerUsuario("luis");
    partida=miJuego.obtenerPartida(res.codigo);
  });

  it("inicialmente", function(){
    expect(us1.nick).toEqual("pepe");
    expect(us2.nick).toEqual("luis");

    //comprobar que los usuarios están en la partida
    //comprobar que cada usuario tiene 2 tableros de 5x5
    //que contienen agua (esAgua())
    //comprobar que cada usuario tiene 1 flota de 2 barcos
    //de tamaño 4 y 2
    //comprobar que la partida esta en fase jugando
  });

  it("luis y pepe están en la partida",function(){
    expect(partida.estoy("pepe")).toEqual(true);
    expect(partida.estoy("luis")).toEqual(true);
  });

  it("los dos jugadores tienen tablero propio y rival",function(){
    expect(us1.tableroPropio).toBeDefined();
    expect(us2.tableroPropio).toBeDefined();
    expect(us1.tableroRival).toBeDefined();
    expect(us2.tableroRival).toBeDefined();

    expect(us1.tableroPropio.casillas.length).toEqual(SIZE);
    expect(us2.tableroPropio.casillas.length).toEqual(SIZE);

    //habría que recorrer las 5 columnas
    for(x=0;x<5;x++){
      expect(us1.tableroPropio.casillas[x].length).toEqual(SIZE);
    }
  //  expect(us2.tableroPropio.casillas[0].length).toEqual(5);
    
    //habría que recorrer todo el tablero
    for(x=0;x<10;x++){ //us1.tableroPropio.casillas.length
      for(y=0;y<10;y++){//us1.tableroPropio.casillas[x].length
        expect(us1.tableroPropio.casillas[x][y].contiene.nombre).toEqual("agua");
      }
    }
  });

  it("los dos jugadores tienen flota (3 barcos, tam 2, 3 y 4)",function(){
    expect(us1.flota).toBeDefined();
    expect(us2.flota).toBeDefined();
    
    //expect(us1.flota.length).toEqual(2);  //da fallo porq es un array asociativo
    expect(Object.keys(us1.flota).length).toEqual(3); //seria asi
    expect(Object.keys(us2.flota).length).toEqual(3);
    
    //expect(us1.flota[0].tam).toEqual(2); //aqui igual
    expect(us1.flota["La Niña"].tam).toEqual(2);
    expect(us1.flota["La Pinta"].tam).toEqual(3);
    expect(us1.flota["La Santamaria"].tam).toEqual(4);
  });

  it("la partida está en fase desplegando",function(){
    expect(partida.esJugando()).toEqual(false);
    expect(partida.esDesplegando()).toEqual(true); //Este metodo no lo tenemos
  })

  describe("Barcos fuera de limites",function(){
    beforeEach(function(){ 
      us1.colocarBarco("La Niña",9,9); // no cabe
	    us1.colocarBarco("La Santamaria",9,7); // no cabe
	    us1.barcosDesplegados();
	    us2.colocarBarco("La Niña",7,7);// Este si deberia el resto no 7,7 8,7
	    us2.colocarBarco("La Santamaria",9,9);// no cabe
	    us2.barcosDesplegados();    
    });

    it("Comprobar que no se puede colocar barcos fuera de los limites",function(){
      barco2us1=us1.obtenerBarcoDesplegado("La Niña");
      barco4us1=us1.obtenerBarcoDesplegado("La Santamaria");
      barco2us2=us2.obtenerBarcoDesplegado("La Niña");
      barco4us2=us2.obtenerBarcoDesplegado("La Santamaria");
      expect(us1.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
      expect(us1.tableroPropio.casillas[9][7].contiene.nombre).toEqual("agua");
      expect(us2.tableroPropio.casillas[7][7].contiene).toEqual(barco2us2);//En estos dos si deberian de estar
      expect(us2.tableroPropio.casillas[8][7].contiene).toEqual(barco2us2);
      expect(us2.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
    })
  })

  describe("A jugar!",function(){
    beforeEach(function(){ //Como esta anidado, el beforeEach de arriba tambien se hace
      us1.colocarBarco("La Niña",0,0); // 0,0 1,0
      us1.colocarBarco("La Pinta",0,2); // 0,2 1,2 2,2
	    us1.colocarBarco("La Santamaria",0,1); // 0,1 1,1 2,1 3,1
	    us1.barcosDesplegados();
	    us2.colocarBarco("La Niña",3,3);// 3,3 4,3
      us2.colocarBarco("La Pinta",5,5); // 5,5 6,5 7,5
	    us2.colocarBarco("La Santamaria",4,4);// 4,4 5,4 6,4 7,4
	    us2.barcosDesplegados();    
    });

    it("Comprobar que los barcos estan bien colocados",function(){
      barco2us1=us1.obtenerBarcoDesplegado("La Niña");
      barco3us1=us1.obtenerBarcoDesplegado("La Pinta");
      barco4us1=us1.obtenerBarcoDesplegado("La Santamaria");
      barco2us2=us2.obtenerBarcoDesplegado("La Niña");
      barco3us2=us2.obtenerBarcoDesplegado("La Pinta");
      barco4us2=us2.obtenerBarcoDesplegado("La Santamaria");

      //Usr1
        //Barco La Niña
      expect(us1.tableroPropio.casillas[0][0].contiene).toEqual(barco2us1);
      expect(us1.tableroPropio.casillas[1][0].contiene).toEqual(barco2us1);
        //Barco La Pinta
      expect(us1.tableroPropio.casillas[0][2].contiene).toEqual(barco3us1);
      expect(us1.tableroPropio.casillas[1][2].contiene).toEqual(barco3us1);
      expect(us1.tableroPropio.casillas[2][2].contiene).toEqual(barco3us1);
        //Barco La Santamaria
      expect(us1.tableroPropio.casillas[0][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[1][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[2][1].contiene).toEqual(barco4us1);
      expect(us1.tableroPropio.casillas[3][1].contiene).toEqual(barco4us1);

      //Usr2
        //Barco La Niña
      expect(us2.tableroPropio.casillas[3][3].contiene).toEqual(barco2us2);
      expect(us2.tableroPropio.casillas[4][3].contiene).toEqual(barco2us2);
        //Barco La Pinta
      expect(us2.tableroPropio.casillas[5][5].contiene).toEqual(barco3us2);
      expect(us2.tableroPropio.casillas[6][5].contiene).toEqual(barco3us2);
      expect(us2.tableroPropio.casillas[7][5].contiene).toEqual(barco3us2);
        //Barco La Santamaria
      expect(us2.tableroPropio.casillas[4][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[5][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[6][4].contiene).toEqual(barco4us2);
      expect(us2.tableroPropio.casillas[7][4].contiene).toEqual(barco4us2);


    })


    it("Comprobar que las flotas estan desplegadas",function(){ //metodos todosDesplegados...
      expect(us1.todosDesplegados()).toEqual(true);
      expect(us2.todosDesplegados()).toEqual(true);

    });

    it("Comprobar jugada que Pepe gana",function(){

      //Comprobación de que el numero de disparos se inicializa correctamente
      expect(us1.disparos).toEqual(0)

      //Primero compruebo que los 3 estan intactos
      expect(us2.flota["La Niña"].obtenerEstado()).toEqual("intacto");
      expect(us2.flota["La Pinta"].obtenerEstado()).toEqual("intacto");
      expect(us2.flota["La Santamaria"].obtenerEstado()).toEqual("intacto");
      //Disparo al primero y compruebo que cambie a tocado
      us1.disparar(3,3);
      expect(us2.flota["La Niña"].obtenerEstado()).toEqual("tocado");
      //Le vuelvo a disparar y espero que pase a hundido(tamaño 2) y que el resto sigan intactos
	    us1.disparar(4,3);
      expect(us2.flota["La Niña"].obtenerEstado()).toEqual("hundido");
      expect(us2.flota["La Pinta"].obtenerEstado()).toEqual("intacto");
      expect(us2.flota["La Santamaria"].obtenerEstado()).toEqual("intacto");
      //Disparo al de 4 y espero que pase a tocado tambien
	    us1.disparar(4,4);
      expect(us2.flota["La Santamaria"].obtenerEstado()).toEqual("tocado");
      //Termino de disparar y espero que este hundido
	    us1.disparar(5,4);
	    us1.disparar(6,4);
	    us1.disparar(7,4);
      expect(us2.flota["La Santamaria"].obtenerEstado()).toEqual("hundido");
      //Aqui deberia dar falso
      expect(us2.flotaHundida()).toEqual(false);
      //Disparo al de 3 para terminar de hundir la flota
      us1.disparar(5,5);
      expect(us2.flota["La Pinta"].obtenerEstado()).toEqual("tocado");
	    us1.disparar(6,5);

      //Comprobar numero de disparos suma bien
      expect(us1.disparos).toEqual(8)
	    us1.disparar(7,5);
      expect(us2.flota["La Pinta"].obtenerEstado()).toEqual("hundido");
      expect(us2.flotaHundida()).toEqual(true);
      expect(us1.flotaHundida()).toEqual(false);

      //Comprobar que la partida pasa a estado final
      expect(partida.esJugando()).toEqual(false);
      expect(partida.esFinal()).toEqual(true);
      //Comprobamos que el numero de disparos se reinicia bien
      expect(us1.disparos).toEqual(0)

    });

    it("Comprobar el cambio de turno",function(){ //Comprobar también que no cambia de turno si acierta
      expect(partida.turno).toEqual(us1);
      us1.disparar(2,2);
      expect(partida.turno).toEqual(us2);


    });

    it("Comprobar que no deja disparar si no es tu turno",function(){
      expect(partida.turno).toEqual(us1);
      expect(us1.flota["La Niña"].obtenerEstado()).toEqual("intacto");
      us2.disparar(0,0);
      expect(us1.flota["La Niña"].obtenerEstado()).toEqual("intacto");

    });

  });
  describe("Comprobar cambios de rotación",function(){
    beforeEach(function(){ //Como esta anidado, el beforeEach de arriba tambien se hace
      us1.colocarBarco("La Niña",0,0); // 0,0 1,0
      us1.cambiarOrientacion(); //Ahora pongo vertical
      us1.colocarBarco("La Santamaria",0,1); // 0,1 1,1 2,1 3,1
      us1.cambiarOrientacion();//Ahora pongo horizontal
      us1.colocarBarco("La Pinta",3,3); //3,3 4,3 5,3
      us1.barcosDesplegados();
      us2.colocarBarco("La Niña",3,3);// 3,3 4,3
      us2.cambiarOrientacion();//Cambio a vertical
      us2.colocarBarco("La Santamaria",4,4);// 4,4 5,4 6,4 7,4
      us2.cambiarOrientacion();//Cambio a horizontal otra vez
      us2.colocarBarco("La Santamaria",0,0); //0,0 1,0 2,0
      us2.barcosDesplegados();    
    });
  
    it("Comprobar b2 horizontal y b4 vertical",function(){
      barco2us1=us1.obtenerBarcoDesplegado("La Niña");
      barco3us1=us1.obtenerBarcoDesplegado("La Pinta");
      barco4us1=us1.obtenerBarcoDesplegado("La Santamaria");
      barco2us2=us2.obtenerBarcoDesplegado("La Niña");
      barco3us2=us2.obtenerBarcoDesplegado("La Pinta");
      barco4us2=us2.obtenerBarcoDesplegado("La Santamaria");
      
      //La Niña y la Pinta de ambos debe estar horizontales y la Santamaria verticales
      expect(barco2us1.orientacion.nombre).toEqual("horizontal")
      expect(barco3us1.orientacion.nombre).toEqual("horizontal")
      expect(barco4us1.orientacion.nombre).toEqual("vertical")
      expect(barco2us2.orientacion.nombre).toEqual("horizontal")
      expect(barco3us2.orientacion.nombre).toEqual("horizontal")
      expect(barco4us2.orientacion.nombre).toEqual("vertical")
  
      
  
    })
  });

});