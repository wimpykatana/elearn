const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use('/backoffice-tell', express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9002);