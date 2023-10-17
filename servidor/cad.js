var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;



function Cad() {
    this.logs;
    this.usuarios;

    //logs
    this.insertarLog = function (registroLog, callback) {
        insertar(this.logs, registroLog, callback);
    }

    this.obtenerLogs=function(callback){
        obtenerTodos(this.logs,callback)
    }

    //partidas
    //usuarios

    function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });

    }

    function obtenerTodos(coleccion,callback){
        coleccion.find().toArray(function(error,col){
            callback(col);
        });
    };

    this.obtenerOCrearUsuario = function (criterio, callback) { //Buscar y si no lo encuentra crear
        obtenerOCrear(this.usuarios, criterio, callback)
    }

    function obtenerOCrear(coleccion, criterio, callback) {
        coleccion.findOneAndUpdate(criterio, { $set: criterio }, { upsert: true }, function (err, doc) {
            if (err) { throw err; }
            else {
                console.log("Updated");
                callback(doc);
            }
        });
    }



    this.conectar = function () {
        let cad = this;
        //mongodb+srv://batalla:<password>@cluster0.yzyhrzl.mongodb.net/?retryWrites=true&w=majority
        
        mongo.connect("mongodb+srv://maria:maria@cluster0.k3acwxr.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true }, function (err, database) {
            if (!err) {
                console.log("Conectado a MongoDB Atlas");
                database.db("batalla").collection("logs",function(err,col){
                    if (err) {
                        console.log("No se puede obtener la coleccion")
                    }
                    else {
                        console.log("Tenemos la colección de logs");
                        cad.logs =col;
                    }
                });
                database.db("batalla").collection("usuarios",function(err,col){
                    if (err) {
                        console.log("No se puede obtener la coleccion")
                    }
                    else {
                        console.log("Tenemos la colección usuarios");
                        cad.usuarios =col;
                    }
                });

            }
            else {
                console.log("No se puedo conectar con MongoDB Atlas")
            }
        })

    }

    // this.conectar();

}

module.exports.Cad = Cad;