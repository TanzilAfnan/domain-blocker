var http = require('http');
const blocker = require('./src/blocker');

// console.log(checkPlatform);
blocker.GetHostsPath();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(blocker.GetHostsPath());
}).listen(8080);