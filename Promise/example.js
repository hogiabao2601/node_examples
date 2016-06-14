'use strict';

/**
 * Created by baohg on 10/06/2016.
 */
var fs = require('fs');

function readFile(filename, enc) {
  return new Promise(function (fulfill, reject) {

  });
}

var a = 'example.js'
function abc(a){
  return new Promise((fulfill, reject) => {
    fs.readFile(a, function (err, res) {
      if (err) {
        reject('Failure!');
      }
      else {
        fulfill('Success!');
      }
    });
  });
}

abc(a).then((data)=> {
  console.log(data);
}).catch((err)=> {
  console.error(err);
})
//
//pro.then((data)=> {
//  console.log(data);
//}).catch((err)=> {
//  console.error(err);
//})