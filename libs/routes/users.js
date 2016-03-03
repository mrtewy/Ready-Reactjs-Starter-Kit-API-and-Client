module.exports = (function() {
    'use strict';

    const COMMENTS_FILE = ('./libs/fakeData/comments.json');
    const router = require('express').Router();
    const fs     = require('fs');

    router.get('/all', function(req, res) {
      fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        try {
          var jsonObj = JSON.parse(data);
          res.json(jsonObj);
        } catch (e) {
          res.status(400).send('Invalid JSON string');
        }
      });
    });

    return router;
})();