function ClienteWS(){
    this.socket;
    //enviar peticiones
    this.conectar = function(){ 
        this.socket=io();
        this.servidorWS(); 
    }

    this.crearPartida = function(){ 
        this.socket.emit("crearPartida",rest.nick); 
    }

    this.usuarioSale = function(nick,codigo){
        //console.log("Entra al cliente socket")
        //console.log(codigo,"cws")
        this.socket.emit("usuarioSale",rest.nick,codigo)
    }

    this.unirseAPartida = function(codigo){
        this.socket.emit("unirseAPartida",rest.nick,codigo);
    }
    this.abandonarPartida=function(){
		this.socket.emit("abandonarPartida",rest.nick,cws.codigo);
	}

    this.colocarBarco=function(nombre,x,y){
        this.socket.emit("colocarBarco",rest.nick,nombre,x,y)
    }
    this.barcosDesplegados=function(){
        this.socket.emit("barcosDesplegados",rest.nick)
    }
    this.disparar=function(x,y){
        this.socket.emit("disparar",rest.nick,x,y)
    }



    this.servidorWS=function(){
        let cli=this; 

        this.socket.on("partidaCreada",function(data){
            console.log(data);
            if(data.codigo!=-1){
                console.log("Partida creada por "+rest.nick + " con codigo "+ data.codigo);
                iu.mostrarCodigo(data.codigo);
                cli.codigo=data.codigo;
				
            }
            else{
                console.log("No se ha podido crear la partida");
                iu.mostrarModal("No se ha podido crear partida");
				iu.mostrarCrearPartida();
                rest.comprobarUsuario();
            }

        });

        this.socket.on("unidoAPartida",function(data){
            if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
                cli.codigo=data.codigo;	
			}
			else{
				console.log("No se ha podido unir a partida")
				
			}
        });

        this.socket.on("actualizarListaPartidas",function(lista){
            //console.log("Entro a actualizar")
			if (!cli.codigo){
                //console.log("paso el if de actualizar")
				iu.mostrarListaDePartidasDisponibles(lista);
			}
		});

        this.socket.on("partidaAbandonada",function(data){
			if (data.codigo!=-1){
                console.log(data.nombreA+" ha abandonado la partida con codigo: "+data.codigoP+"\n"+" Ha ganado "+data.nombreG)
				iu.mostrarHome();
                iu.mostrarModal(data.nombreA+" ha abandonado la partida con codigo: "+data.codigoP+"\n"+" Ha ganado "+data.nombreG);
			}
            else{
                console.log("No se ha podido abandonar la partida");
                iu.mostrarModal(data.nombreA+" ha intentado abandonar la partida pero no ha podido"); 
            }
		});

        this.socket.on("partidaCancelada", function (res) {
            iu.mostrarModal("Has terminado la partida " + res.codigoP + " antes de que se uniese alguien")
            iu.mostrarHome()
        });

        this.socket.on("usuarioSalido",function(res){

            if(!(res.jugadorS==rest.nick)){
                iu.mostrarModal("El usuario " + res.jugadorS + " se ha salido a mitad de la partida")
                iu.mostrarHome()
            }
            else{
                iu.mostrarModal("Te has salido a mitad de partida")
            }
            
        })


        
        this.socket.on("aJugar",function(){
			iu.mostrarModal("A jugaaar!");
		});

        this.socket.on("barcoColocado",function(data){
             console.log(data.colocado.desplegado)
            if (data.colocado.desplegado) {
                let barco = tablero.flota[data.barco];
                tablero.puedesColocarBarco(barco,data.x,data.y);
                iu.mostrarModal("El barco: "+ data.barco + " se ha colocado");
                cli.barcosDesplegados();
            }
            else {
                iu.mostrarModal("No se puede colocar barco")
            }
        })

        this.socket.on("disparo",function(res){
            console.log(res.impacto)
			if (res.atacante==rest.nick){
                
                    tablero.updateCell(res.x,res.y,res.impacto,'computer-player');
			}
			else{
				tablero.updateCell(res.x,res.y,res.impacto,'human-player');	
                }
		});

        this.socket.on("partidaTerminada", function () {
            iu.mostrarModal("La partida ha terminado");
            //tablero.crearGrid();
        });

        this.socket.on("noEsTuTurno", function (data) {
            iu.mostrarModal("No puedes disparar no es tu turno");
        });

        this.socket.on("faseDesplegando", function (data) {
            //tablero.mostrarTablero(true)
            tablero.flota = data.flota;
            tablero.elementosGrid()
            tablero.mostrarFlota();
            console.log("Ya puedes desplegar la flota");
        });

        this.socket.on("finalPartida", function (res) {
            iu.mostrarModal(res+' ha ganado la partida!!');
            // tablero.crearGrid();
            // tablero.mostrarTablero(false);
            iu.finalPartida();
        });


    }


}
