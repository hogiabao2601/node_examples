'use strict';

/**
 * Created by baohg on 03/06/2016.
 */
var fs = require('fs');
var async = require('async');

var file = ['abc.txt', 'dev.json', 'each.js'];


async.map(file, fs.stat, (err, results) => {
  // results is now an array of stats for each file
  console.log(results);
});