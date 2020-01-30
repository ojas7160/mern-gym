const http = require('http');
const server = require('./server.js');
const debug = require('debug')('node-react');

const normalizePort = (val) => {
  var port = parseInt(val, 10)

  if(isNaN(port)) {
    return val;
  }

  if(port >= 0) {
    return port;
  }

  return false;
}

const onListen = () => {
  const addr = setServer.address();
  const bind = typeof addr === 'string' ? "pipe " + addr : "port " + port;
  debug("listening on", bind);
}

const onError = (err) => {
  process.exit(1) // NODEJS.process
  console.log(err);
  throw err;
}

const port = normalizePort(process.env.PORT) || 3001;
console.log(port)
server.set("port", port)

const setServer = http.createServer(server);
setServer.on("error", onError);
setServer.on("listening", onListen);
setServer.listen(port);



