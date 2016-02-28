var express = require('express');
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/static');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));

app.get('/ajax/getData',function (request, response) {
    fs.readFile( __dirname + '/data/data.json', function (err, data) {
        if (err) {
            console.log("fail");
            response.writeHead(404, {'Content-Type': 'application-json'});
        }
        console.log(data.toString());
        response.send(data);
        console.log("success");
    });
});

app.get('/',function(request,response) {
    response.render('home.html');
});

app.listen(8001);
console.log('Server running at http://127.0.0.1:8001/');