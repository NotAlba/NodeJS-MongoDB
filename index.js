// framework express
var express = require('express');
require('dotenv').config();
// bodyparser ens permet processar variables GET i POST
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// per renderitzar les plantilles (render)
app.set('view engine','ejs');

var mongo = require('mongodb').MongoClient;
var mongoClient;

const PORT = process.env.PORT || 5000
const user = encodeURIComponent( process.env.DBUSER );
const pass = encodeURIComponent( process.env.DBPASS );
var dbConStr = "mongodb+srv://"+user+":"+pass+"@cluster0-es3jp.mongodb.net";


// connexió a mongo i start app
mongo.connect(dbConStr, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    // si no hi ha cap error de connexió, engeguem el servidor
    app.listen(PORT, function () {
        console.log('Example app listening on http://localhost:'+ PORT+' !');
    });


});
app.post('/restaurantes', function (req, res) {

  var nom = req.body.name;
  var poblacio= req.body.poblation;
  var categories= req.body.category;
  //categories=JSON.parse(categories);
  var horari=req.body.schedule;
  //horari=JSON.parse(horari);
  var coordinates= req.body.coordinates;
  //coordinates=JSON.parse(coordinates);
  var direccio = req.body.location;
  var telefon = req.body.pnumber;
  var cp= req.body.cp;
  var id= req.body.retrievedId;


  



  if (categories!=undefined && horari!=undefined && coordinates!=undefined) {
    horari=JSON.parse(horari);
    categories=JSON.parse(categories);
    coordinates=JSON.parse(coordinates);

  var restaurantObj = { _id:id,name:nom, location:direccio, poblation:poblacio ,pnumber:telefon, cp:cp, categories:categories, coordenades:coordinates, horari:horari };
  var db = mongoClient.db("RestaurantDB");
  



  db.collection("Restaurant").insertOne(restaurantObj, function(err, result) {
  
    if (err) {
        res.redirect('/menu/?msg=KO');
        return;
    }else{
        autoincrementId();
        //res.render("result",{msg:"OK"});
        res.redirect('/menu/?msg=OK');

    }

  });
  }else{
            res.render("result",{msg:"First"});

  }
});


//Redireccio de l'arrel a menu
app.get('/', function (req, res) {

    res.redirect('/menu');
    
        //res.render("result",{msg:"First"});
});


//Post de MENU per a fer la direccio a la view seleccionada
app.post('/menu', function (req, res) {
    var accionMenu = req.body.menuAction;
    var busqueda= req.body.search;
    var tipoBusqueda= req.body.searchBy;
    console.log(tipoBusqueda);
    console.log(busqueda);


    var db = mongoClient.db("RestaurantDB");
    var opcions = {};
    var query = {};
    var db = mongoClient.db("RestaurantDB");
    db.collection('counters').findOne()
    console.log(accionMenu);

    if (accionMenu=="crea") {
        //Avans de redireccionar a la pagina de creacio li pasem el id d'aquesta forma
        //evitem problemas amb les promeses
        db.collection('counters').find().toArray(function( err, docs ) {
        if( err ) {
            res.render( 'restaurantes');
            return;
        }
        res.render( 'restaurantes', {"restId":docs} );
    });
       
    }
    else if (accionMenu=="busca") {
        if (tipoBusqueda=="_id") {
            db.collection('Restaurant').find({_id:busqueda}).toArray(function( err, docs ) {
            if( err ) {
                console.log("dont working")
            res.render( 'editorHorario' );
                return;
            }
            res.render( 'editorHorario', {"restaurante":docs} );
            });
        }else if(tipoBusqueda=="name"){
            
            db.collection('Restaurant').find({name: new RegExp(busqueda, 'i')}).toArray(function( err, docs ) {
            if( err ) {
            res.render( 'editorHorario' );
                return;
            }
            
            res.render( 'editorHorario', {"restaurante":docs} );
            });
        }
    }
    else if(accionMenu=="llista"){
        db.collection('Restaurant').find().toArray(function( err, docs ) {
        if( err ) {
            res.render( 'listadoRestaurante', {msg:"error a la query"} );
            return;
        }
        res.render( 'listadoRestaurante', {"restaurantes":docs} );
        });
    }
});


app.get('/menu', function (req, res) {
   
    res.render("result");
});
function autoincrementId(){
    var db = mongoClient.db("RestaurantDB");
    
    
    var seqdoc=db.collection('counters').findOneAndUpdate(
            {_id: "productid"} ,
            { $inc: { sequence_value: 1 } },
            {new : true}
 
        );

    return seqdoc;
    
    };
function getId(){
    var db = mongoClient.db("RestaurantDB");
    var id= db.collection('counters').findOne();
    return id;
}


app.post('/editorHorario', function (req, res) {

  var id = req.body.id;
  var horari=req.body.schedule;

  

  if ( horari!=undefined ) {
    horari=JSON.parse(horari);
    console.log(id)
    console.log(horari)
   
  //var restaurantObj = { _id:id,name:nom, location:direccio, poblation:poblacio ,pnumber:telefon, cp:cp, categories:categories, coordenades:coordinates, horari:horari };
  var db = mongoClient.db("RestaurantDB");
  

  db.collection('Restaurant').findOneAndUpdate(
            {_id: id} ,
            {$set:{horari: horari}},
            function(err, result) {
  
    if (err) {
        res.redirect('/menu/?msg=KO');
        return;
    }else{
        
        //res.render("result",{msg:"OK"});
        res.redirect('/menu/?msg=OK');

    }

  }
 
        );

  
  }else{
            res.render("result",{msg:"First"});

  }
});





