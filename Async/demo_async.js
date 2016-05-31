'use strict';

/**
 * Created by baohg on 31/05/2016.
 */
var async = require('async');
var data = [1, 2, 3 , 4, 5];
var data2 = [];

function addOne(element, cb) {
  element += element;
  data2.push(element)
  cb();
}

async.each(data, addOne, function(err) {
  if (err) console.log(err);
  console.log('END', data2);
});

