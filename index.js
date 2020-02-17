// framework express
var express = require('express');
// bodyparser ens permet processar variables GET i POST
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// per renderitzar les plantilles (render)
app.set('view engine','ejs');
  
var mongo = require('mongodb').MongoClient;
var mongoClient;
  
// connexió a mongo i start app
mongo.connect('mongodb://localhost:RestaurantDB', function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    // si no hi ha cap error de connexió, engeguem el servidor
    app.listen(3000, function () {
        console.log('Example app listening on http://localhost:3000 !');
    });
    
  

});
app.post('/restaurantes', function (req, res) {
  var nom = req.body.name;
  var direccio = req.body.location;
  var telefon = req.body.pnumber;
  var cp= req.body.cp;
  
  var restaurantObj = { name: nom, location: direccio, pnumber: telefon, cp: cp };
  var db = mongoClient.db("RestaurantDB");
  db.collection("Restaurant").insertOne(restaurantObj, function(err, result) {
    if (err) {
        res.render("result",{msg:"KO"});
        return;
    }else{
        res.render("result",{msg:"OK"});
    }
    
  });

});
app.get('/restaurantes', function (req, res) {
  res.render('restaurantes');
});
  
// view: llistat elements
app.get('/', function (req, res) {
    var db = mongoClient.db("RestaurantDB");
    var opcions = {};
    var query = {};
    db.collection('Restaurant').find( query, opcions ).toArray(function( err, docs ) {
        if( err ) {
            res.render( 'result', {msg:"error a la query"} );
            return;
        }
        res.render( 'restaurantes', {"restaurantes":docs} );
    });
});
 
