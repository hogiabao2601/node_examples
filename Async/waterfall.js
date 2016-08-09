'use strict';

/**
 * Created by baohg on 26/05/2016.
 */
var async = require('async');

// Or, with named functions:

var config = 'abc';
var config2 = 'xyz';
async.waterfall([
  async.apply(setupConfig1, config),
  async.apply(setupConfig2, config2),
  myFirstFunction,
  mySecondFunction,
  myLastFunction,
], function (err, result) {
  console.log(result);
  // result now equals 'done'
});

function setupConfig1(config, callback) {
  callback(null, config);
}

function setupConfig2(config1, config2,callback) {
  console.log(config1);
  console.log(config2);
  console.log(callback);

  callback(null, config1, config2);
}


function myFirstFunction(config1, config2, callback) {
  callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {
  // arg1 now equals 'one' and arg2 now equals 'two'
  callback(null, 'three');
}
function myLastFunction(arg1, callback) {
  // arg1 now equals 'three'
  callback(null, 'done');
}