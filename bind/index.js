'use strict';

/**
 * Created by baohg on 23/08/2016.
 */
//this.x = 9;
//var module = {
//  x: 81,
//  getX: function () {
//    return this.x;
//  }
//};
//module.getX() // 81
//var retrieveX = module.getX;
//retrieveX();
// returns 9 - The function gets invoked at the global scope
// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
//var boundGetX = retrieveX.bind(module);
//boundGetX(); // 81
var async = require('async')

var EventFlow = {
  verifyConnection: function (socket, cb) {
    if (true) {
      console.log('Refused', socket);
      cb('error123213');
    } else {
      console.log('Connected');
      cb();
    }
  },
}

async.waterfall([
  EventFlow.verifyConnection.bind(null, 'config')
], (error, result) => {
  if (error) return console.log(error);
  console.log('DONE');
});