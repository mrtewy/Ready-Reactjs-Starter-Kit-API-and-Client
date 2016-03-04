const fs                    = require('fs');
const express               = require('express');
const path                  = require('path');
const logger                = require('morgan');
const bodyParser            = require('body-parser');
const compression           = require('compression');
const app                   = express();
 
/* Config Middleware */
app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('assets/', express.static(path.join(__dirname + 'node_modules/')); // redirect CSS bootstrap
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* middleware specific to this router */
app.use(function (req, res, next) {
  // no cache on all requests:
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-cache');
  next();
});

/* Router */
const routes = require('./libs/routes');
// Wire up your routes using the express
routes(app);

/* start server */
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  const host = server.address().address
  console.log("Server listening at http://%s:%s", host, port)
});

module.exports = app;
