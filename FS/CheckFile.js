'use strict';

/**
 * Created by baohg on 02/06/2016.
 */
const fs = require('fs');

var Promise = require("bluebird");

var accessFile = Promise.promisify(fs.access);
var readFile = Promise.promisify(fs.readFile);

var file = '/home/baohg/IdeaProjects/node_examples/FS/bad.json';
accessFile(file, fs.R_OK)
  .then(()=> {
    readFile(file, 'utf-8')
      .then((result)=> {
        console.log(result);
      })
      .catch((err) => {
        console.error("2222222222222222");
        console.error(err);
      })
  })
  .catch((err) => {
    console.error("111111111111111");
    console.error(err);
  });


//var file = ;
//
//var b = accessFile(file, fs.R_OK)
//  .then(function (err) {
//    var tt = 0;
//    for(var i= 1; i<= 100000; i++){
//      tt += i;
//    }
//
//    console.log(tt);
//    if (!err){
//      console.log('++++');
//    }else{
//      console.error('----');
//    }
//  })
//  .catch(SyntaxError, function (e) {
//    console.error("File had syntax error", e);
//  })
//  .catch(function (e) {
//    console.error("Error reading file", e);
//  });


//console.log(b);


//.then(function (val) {
//  console.log(val);
//})
//


//fs.access('/home/baohg/IdeaProjects/node_examples/FS/bad.json', fs.R_OK , (err) => {
//  console.log(err);
//  console.log(err ? 'no access!' : 'can read/write');
//});


//result.then(function(kq){
//  if (kq === null){
//    console.log("abc");
//  }
//});


//function checkPfxFile(file) {
//  var result = {};
//
//  FS.access(file, fs.F_OK, function (err) {
//    if (err) {
//      result.err = true;
//    } else {
//
//    }
//  });
//}


//function main() {
//  //console.log(addNumber());
//
//  addNumber().then(response => {
//    console.log(response);
//  }, error => {
//    console.log(error);
//  });
//}
//
//function addNumber() {
//  return new Promise((resolve, reject) => {
//    fs.readFile('/home/baohg/IdeaProjects/node_examples/FS/bad.json', 'utf-8', (err, result) => {
//      if (err) {
//        reject(err)
//      }
//      resolve(result)
//    });
//  });
//}
//
//main();
//
