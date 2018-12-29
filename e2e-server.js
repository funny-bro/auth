const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
  console.log('JSON.stringify(req.headers): ', JSON.stringify(req.headers))
  res.sendFile(path.resolve(__dirname + '/dist', 'index.html'));
});

const port = 8080;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
