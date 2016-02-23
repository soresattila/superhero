// Beolvassuk a szükséges csomagokat.
var express = require('express');
var fs = require('fs');

// Létrehozunk egy express szerver példányt.
var app = express();

// Statikus fájlok.
app.use(express.static('public'));

// Definiáljuk a szerver működését.
app.get('/', function (req, res) {
    fs.readFile('./index.html', 'utf8', function (err, data) {
        res.send( data );
    });
});

// Falhasználó modell.
function handleUsers(req, res) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;

        // var path = req.url.split( '/' );
        var users = JSON.parse(data);
        var _user = {};
        
        // Ha nem kaptunk id-t.
        if ( !req.params.id ) {
            _user = users;
        } else {
            for (var k in users) {
                if (req.params.id == users[k].id) {
                    _user = users[k];
                }
            }            
        }

        res.send(JSON.stringify(_user));
    });
}

// Felhasználók beolvasása.
app.get('/users/:id*?', function (req, res) {
    console.log(req.url);
    handleUsers(req, res);
});


// Megadjuk hogy a szerver melyik portot figyelje.
app.listen(3333);