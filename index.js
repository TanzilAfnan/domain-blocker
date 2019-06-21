var http = require('http');
const blocker = require('./src/blocker');

// console.log(checkPlatform);
// blocker.GetHostsPath();

if(false){
  blocker.block((err, data) => {
    if(err)return
  
    // res.end(data);
  });
}
else{
  blocker.unBlock((err, data) => {
    if(err)return
  
    // res.end(data);
  });
}



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // blocker.block((err, data) => {
  //   if(err)return

  //   res.end(data);
  // });
  
}).listen(8080);