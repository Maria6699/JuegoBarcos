function ClienteRest(){
    this.nick;

    this.agregarUsuario=function(nick){
		var cli=this;
		$.getJSON("/agregarUsuario/"+nick,function(data){ //funcion getJSON de JQuery
            //Este data proviene de los response.send(res) del API REST(index.js), los campos deben ser iguales
			//se ejecuta cuando conteste el servidor, funcion de callback
			console.log(data);
			if (data.nick!=-1){
                console.log("Usuario " + data.nick + " registrado")
                cli.nick=data.nick;
				//ws.nick=data.nick;
				$.cookie("nick",data.nick);
				cws.conectar();    
				iu.mostrarHome();
                
                
                
			}
			else{
                console.log("No se ha podido registrar el usuario")
				iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
                
			}
		})
        //Aqui aun no sabemos si ha contestado el servidor
        //Lo puesto aqui se ejecuta a la vez que la llamada, sin embargo en la parte de arriba en la funcion
        //de callback si estoy seguro(por si quiero poner algo que sepa seguro q tiene q ir despues)
	}

	this.comprobarUsuario = function(){
		let cli= this;
		$.getJSON("/comprobarUsuario/"+this.nick,function(data){
			if (data.nick!=-1){
                console.log("Usuario " + data.nick + " activo")
				cws.conectar();    
				iu.mostrarHome();
		}
			else{
                console.log("No se ha podido registrar el usuario")
				//iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
                
			}
		});
	}

    this.crearPartida = function(){
        let cli=this;
        let nick=cli.nick;
        
        $.getJSON("/crearPartida/"+nick,function(data){
            console.log(data)
            if(data.codigo!=-1){
                console.log("Partida creada por "+nick + " con codigo "+ data.codigo)
                iu.mostrarCodigo(data.codigo);
				//$.cookie("nick",cli.nick);
            }
            else{
                console.log("No se ha podido crear la partida")
            }

        })


    }

    this.unirseAPartida=function(codigo){
		let cli=this;
		$.getJSON("/unirseAPartida/"+cli.nick+"/"+codigo,function(data){
			//se ejecuta cuando conteste el servidor
			//console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+cli.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
				//ws.nick=data.nick;
				//$.cookie("nick",cli.nick);
				//iu.mostrarHome(data);
			}
			else{
				console.log("No se ha podido unir a partida")
				//iu.mostrarModal("El nick ya está en uso");
				//iu.mostrarAgregarJugador();
			}
		});
	}

    this.obtenerListaPartidas = function (){ 
        let cli=this;
        $.getJSON("/obtenerPartidas",function(lista){
            console.log(lista);
            iu.mostrarListaPartidas(lista);

        })

    }


    this.obtenerListaPartidasDisponibles=function(){
		let cli=this;
		$.getJSON("/obtenerPartidasDisponibles",function(lista){
			console.log(lista);
			iu.mostrarListaDePartidasDisponibles(lista);
		});
	}

	this.usuarioSale=function(){
		let nick=this.nick;
		
		$.getJSON("/salir/"+nick,function(data){
			$.removeCookie("nick");
			iu.comprobarCookie();
			//console.log(data.codigo,"cliente rest");
			cws.usuarioSale(nick,data.codigo);
		})
	}
    

    
}

//Lo de module.exports no se pone aqui al ser del cliente, ya que todo lo puesto aqui es global
//Los objetos del cliente(index.html,clienteRest,...) estan en el servidor y con la primera peticion de http el servidor los manda al cliente
//pero como los renderiza el cliente en el diagrama despliegue los ponemos en el navegador no en el servidor