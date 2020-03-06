const http = require('http');
const express = require('express');
var routes = require('./routs/router');
var exp = require('./express');
const Controller = require('./routs/controllers');
let app = express();
exp(app,express);
routes(app);

const server = http.Server(app);
server.listen(process.env.PORT || 3000);
console.log("Listining on port ${rocess.env.PORT || 3000}");