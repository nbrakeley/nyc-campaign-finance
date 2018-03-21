var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionConfig = {
   "user": "finance",
   "port": 5432,
   "password": "finance",
   "database": "campaign_finance",
   "host": "localhost"
}
var db = pgp(connectionConfig);

// add query functions

function getAllContributions(req, res, next) {
  db.any("select *, to_char(contribdate, 'YYYY-MM-DD') as cdate from contributions_2017 limit 1000")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL contributions_2017'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAggregateContributions(req,res,next) {
  db.any('SELECT recipname, sum(amnt) FROM contributions_2017 GROUP BY recipname ORDER BY sum DESC')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved aggregate contributions_2017'
        });
    })
    .catch(function (err) {
      return next(err);
    }); 
}

module.exports = {
  getAllContributions: getAllContributions,
  getAggregateContributions: getAggregateContributions
  // createPuppy: createPuppy,
  // updatePuppy: updatePuppy,
  // removePuppy: removePuppy
};