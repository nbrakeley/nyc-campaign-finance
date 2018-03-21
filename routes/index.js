var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../queries');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', 'public', 'views', 'index.html'));
});

router.get('/api/contributions', db.getAllContributions);
router.get('/api/aggregateContributions', db.getAggregateContributions);

module.exports = router;
