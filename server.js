const fs                    = require('fs');
const express               = require('express');
const path                  = require('path');
const logger                = require('morgan');
const bodyParser            = require('body-parser');
const compression           = require('compression');
const router                = express.Router();
const app                   = express();
 
/* Config Middleware */
app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* middleware specific to this router */
app.use(function timeLog(req, res, next) {
  // no cache on all requests:
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'no-cache');
  next();
});

/* Handle 404 error. The last middleware.*/
router.use("*",function(req,res){
  res.status(404).send('404');
});


/* Router */
const routerUsers = require('./libs/routes/users');
app.use('/api/users', routerUsers);

/* start server */
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  const host = server.address().address
  console.log("Server listening at http://%s:%s", host, port)
});

module.exports = app;
