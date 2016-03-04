module.exports = function (app) {
  'use strict';

  const fs        = require('fs');
  const path      = require('path');
  const express   = require('express');
  const router    = express.Router();

  // Loop to load all routes files js
  {
    const files = fs.readdirSync("libs/routes");
    for(const index in files) {
        const file = files[index];
        if (file === "index.js") continue;
        // skip non-javascript files
        if (path.extname(file) != ".js") continue;
        const routes = require("./" + path.basename(file));
        // Add router to handle routing
        routes(router);
    }
  }

  // 404 Handling
  router.get('*', function(req, res){
    res.json({
      callback:[],
      status:'404',
      message:'Page you request are not found',
    });
  });

  // set root index
  app.use('/api', router);

};
