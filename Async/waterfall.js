'use strict';

/**
 * Created by baohg on 26/05/2016.
 */
var async = require('async');

async.waterfall([
  function(callback) {
    var one = 'one', two ='two';
    // null is error
    callback(null, one, two);
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    console.log(arg1);
    console.log(arg2);
    callback(null, 'three');
  },
  function(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
  }
], function (err, result) {
  // result now equals 'done'
});