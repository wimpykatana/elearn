const express = require('express');
const path = require('path');
const app = express();
//const prerender = require('prerender');
//const server = prerender();

//server.start();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), {} , function(err, data) {
    if(err) {
      return res.render('error.html', function(err, html) {
        if(err){
          return res.send("Server error");
        }
        
        res.send(html)
      });
    }
  });
});

const port = 9000;

app.listen(port);
console.log('client tell up');
