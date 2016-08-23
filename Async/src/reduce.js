'use strict';

/**
 * Created by baohg on 09/08/2016.
 */
const async = require('async');

async.reduce([1, 2, 3], 0, function (memo, item, callback) {
  // pointless async:
  console.log(memo);
  process.nextTick(function () {
    callback(null, memo + item)
  });
}, function (err, result) {
  // result is now equal to the last value of memo, which is 6
});