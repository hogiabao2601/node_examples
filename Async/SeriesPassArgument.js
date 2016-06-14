'use strict';

/**
 * Created by baohg on 10/06/2016.
 */
var async = require('async');

function taskFirst(k, v, callback) {
  console.log(k, v);


}

function taskSecond(k, v, callback) {
  console.log(k, v);

  // Do some async operation
  if (error) {
    callback(error);
  } else {
    callback(null, result);
  }
}

function run() {
  var g1 = "Something";
  var g2 = "Something";
  var g3 = "Something";
  var g4 = "Something";

  async.series(
    [
      // Here we need to call next so that async can execute the next function.
      // if an error (first parameter is not null) is passed to next, it will directly go to the final callback
      function (next) {
        taskFirst(g1, g2, next);
      },
      // runs this only if taskFirst finished without an error
      function (next) {
        taskSecond(g3, g4, next);
      }
    ],
    function(error, result){

    }
  );
}

run();