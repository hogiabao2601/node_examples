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
function abc(a) {
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
//
//abc(a).then((data)=> {
//  console.log(data);
//}).catch((err)=> {
//  console.error(err);
//})


function getLoginPage() {
  return new Promise((fulfill, reject)=> {
    var res = 'okie1';
    var err = null;
    if (err) {

      reject(err)
    } else {
      console.log(res);
      fulfill(res)
    }
  })
};


function login() {
  return new Promise((fulfill, reject)=> {
    var res = 'okie2';
    try {
      console.log(res);
      //throw exception
      fulfill(res)
    } catch (err) {
      reject(err)
    }

  })
};

function login1() {
  return new Promise((fulfill, reject)=> {
    var res = 'okie3';
    try {
      throw exception
      //fulfill(res)
    } catch (err) {
      reject(err)
    }

  })
};

getLoginPage()
  .then((res)=> {
    return login()
  })
  .then((res)=> {
    return login1();
  })
  .then((res)=> {
    console.log(res);
  })
  .catch((err)=> {
    console.error(err);
  });