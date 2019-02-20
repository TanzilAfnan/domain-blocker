var http = require('http');
const blocker = require('./src/blocker');

// console.log(checkPlatform);
blocker.checkPlatform();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(blocker.checkPlatform());
}).listen(8080);