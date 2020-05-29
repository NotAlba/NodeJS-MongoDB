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
  if (categories!=undefined && horari!=undefined && coordinates!=undefined) {
    horari=JSON.parse(horari);
    categories=JSON.parse(categories);
    coordinates=JSON.parse(coordinates);

  var restaurantObj = { name:nom, location:direccio, poblation:poblacio ,pnumber:telefon, cp:cp, categories:categories, coordenades:coordinates, horari:horari };
  var db = mongoClient.db("RestaurantDB");
  db.collection("Restaurant").insertOne(restaurantObj, function(err, result) {
    if (err) {
        res.render("result",{msg:"KO"});
        return;
    }else{
        //res.render("result",{msg:"OK"});
        res.redirect('/menu/?msg=OK');

    }

  });
  }else{
            res.render("result",{msg:"First"});

  }
});


// view: llistat elements

app.get('/', function (req, res) {
    console.log("here again")
    res.redirect('/menu');
        //res.render("result",{msg:"First"});
});


app.post('/menu', function (req, res) {
    var accionMenu = req.body.menuAction;
    var busqueda= req.body.search;
    console.log(accionMenu+"funciono");

    var db = mongoClient.db("RestaurantDB");
    var opcions = {};
    var query = {};

    if (accionMenu=="crea") {
        res.render( 'restaurantes');
    }
    else if (accionMenu=="busca") {
        res.render('result',{search:busqueda});
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
    var msg=req.query.msg;
    console.log(msg);
    res.render("result",{msg:msg});
});
