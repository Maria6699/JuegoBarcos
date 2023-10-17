function ControlWeb() {

    this.comprobarCookie = function () {
        if ($.cookie('nick')) {
            rest.nick = $.cookie('nick');
            rest.comprobarUsuario();
            // cws.conectar();
            this.mostrarHome();
        } else {
            this.mostrarAgregarUsuario();
        }

    }

    this.mostrarAgregarUsuario = function () {


        var cadena = '<div class="row" id="mAU">';//'<form class="form-row needs-validation"  id="mAU">';
        cadena = cadena + '<div class="col"><p>Introduce un nombre:</p></div>';
        cadena = cadena + '<div class="row">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<input type="email" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2 float-right">Iniciar sesión</button>';
        cadena = cadena + '<a id="btnGo" href="/auth/google" class="btn btn-primary mb-2 mr-sm-2 float-right">Accede con Google</a>';
        cadena= cadena + '<br>';
        cadena = cadena + '<img class="float-right" id="myImage" src="./cliente/g.png" style="width: 35px" ></a>';
        cadena = cadena + '&nbsp<a href="/auth/facebook" class="btn btn-primary mb-2 mr-sm-2 float-right">Accede con Facebook</a>';
        cadena = cadena + '<img class="float-right " id="myImage" src="./cliente/facebook.png" style="width: 35px" ></a>';
        cadena = cadena + '</div></div>'; //' </form>';
        cadena = cadena + '<div id="nota"></div></div></div>';


        $("#agregarUsuario").append(cadena);
        //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");    

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                if (!$('#nota').hasClass('invalid-nick')) {
                    $('#nota').addClass('invalid-nick').append('<span style="color: red;">Nick inválido</span>&nbsp');
                }
            } else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                $("#aviso").remove();
                rest.agregarUsuario(nick);
            }
        });
        
    }

    this.mostrarHome = function () {

        $("#mH").remove();
        $('#gc').remove();

        let cadena = '<div class="col" id="mH">';
        cadena = cadena + "<div ><h2> ¡Bienvenido " + rest.nick + "&nbsp a nuestra pagina web! "+"</h2><br></div>"
        cadena = cadena + '<div style="margin-bottom:15px" id="codigo"></div>'
        cadena = cadena + '<button id="btnS" class="btn btn-danger mb-2 mr-sm-2 float-right">Salir</button>';
        cadena = cadena + '</div>'


        $('#agregarUsuario').append(cadena);
        this.mostrarCrearPartida();
		rest.obtenerListaPartidasDisponibles();

        $("#btnS").on("click", function (e) {
            $("#mCP").remove();
			$('#mLP').remove();
			$('#mH').remove();
            $('#gc').remove();
			rest.usuarioSale();
            
           
            
           
			//$.removeCookie("nick");
			//iu.comprobarCookie();
            

        })

        


    }

    this.mostrarCrearPartida = function () {
        //dibujar un boton que al hacer click llame a crear partida de rest

        $('#mCP').remove();

        let cadena = '<div class="row" id="mCP">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<br>';
        cadena = cadena + '<button id="btnCP" class="btn btn-primary mb-2 mr-sm-2 float-right">Crear Partida</button>';
        cadena = cadena + '</div>'
        cadena = cadena + '</div>'

        $('#crearPartida').append(cadena);

        $("#btnCP").on("click", function (e) {
            $('#mCP').remove();
            $('#mLP').remove();
            //rest.crearPartida();  Ahora usamos WS
            cws.crearPartida();
        })



        




    }
    
    this.mostrarAbandonarPartida = function(){

        $('#mAbP').remove();

        let cadena = '<div class="row" id="mAbP">';
        cadena = cadena + '<div style="margin-top:15px" class="col">'
        cadena = cadena + '<button id="btnAbP" class="btn btn-primary mb-2 mr-sm-2 float-left">Abandonar Partida</button>';
        cadena = cadena + '</div>'
        cadena = cadena + '</div>'

        $('#codigo').append(cadena);
        
        $("#btnAbP").on("click", function (e) {

            cws.abandonarPartida();
        })
    }

    this.mostrarCodigo = function (codigo) {
        let cadena = " Codigo de la partida: " + codigo;
        cadena = cadena + '<hr>';
        $('#codigo').append(cadena);

        iu.mostrarAbandonarPartida();
    }

    

    this.mostrarListaDePartidas = function (lista) {
        $('#mLP').remove();
        let cadena = "<div id='mLP'>";
        cadena = cadena + '<ul class="list-group">';
        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item">' + lista[i].codigo + ' propietario: ' + lista[i].owner + '</li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + "</div>"
        $('#listaPartidas').append(cadena);

    }

    this.mostrarListaDePartidasDisponibles = function (lista) {
        $('#mLP').remove();
        
        let cadena = "<div class='row' id='mLP'>";
        cadena= cadena + "<br>";
        cadena= cadena + "<br>";
        cadena = cadena + "<h4>Lista de partidas disponibles</h4>";
        cadena= cadena + "<hr>";
        cadena = cadena + "<div class='col'>";
           // cadena = cadena + "<hr>";
            //cadena = cadena + "<h4>Lista de partidas disponibles</h4>";
           // cadena = cadena + "<hr>";
        cadena= cadena + "<br>";
        cadena= cadena + "<br>";
        if(lista.length == 0){
        cadena = cadena + "<body>";
        cadena = cadena + "<div class= 'text-center'>";
        cadena = cadena + "<div class='loader-container' >";
            cadena = cadena + "<div class='loader' style='width: 50px; height: 50px;'></div>";
            cadena = cadena + "<div class='loader2' style='width: 100px; height: 100px;'></div>";
        cadena = cadena + "</div>";
        cadena = cadena + "</div>";
        cadena = cadena + "</body>";
        }
        //cadena = cadena + '<button id="btnAP" class="btn btn-primary mb-2 mr-sm-2">Actualizar Partidas</button>';
        cadena = cadena + '<ul class="list-group">';
        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item"><a href="#" value="' + lista[i].codigo + '"> Nick propietario: ' + lista[i].owner + '</a></li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + "</div></div>"
        $('#listaPartidas').append(cadena);

        $("#btnAP").on("click", function (e) { //este es el boton que hemos quitado por los WS
            $('#mLP').remove();
            rest.obtenerListaPartidasDisponibles();

        })

        $(".list-group a").click(function () {
            codigo = $(this).attr("value");
            console.log(codigo);
            if (codigo) {
                $('#mLP').remove();
                $('#mCP').remove();
                //rest.unirseAPartida(codigo);
                cws.unirseAPartida(codigo);
            }
        });
    }

    this.finalPartida = function(){
		$('#mH').remove()
        cws.codigo = undefined;
		$('#gc').remove();
		tablero = new Tablero(10);
		this.mostrarHome()
	}

    

    this.mostrarModal = function (msg) {
        $('#mM').remove();
        var cadena = "<p id='mM'>" + msg + "</p>";
        $('#contenidoModal').append(cadena);
        $('#miModal').modal("show");
    }



    //(Jquery)Con almohadilla busca el id en el html, con punto buscará la clase, sin nada buscara los contenidos de la etiqueta
    //para eliminar: $('#mAU).remove()



}