'use strict';

/**
 * Created by baohg on 02/06/2016.
 */

const fs = require('fs');
const async = require('assert');

var files = ['./abc1.txt', './abc2.txt', './abc.txt'];

files.forEach((file)=>{
  try {
    checkAnyThing(file);
  } catch (err) {
    console.log('123');
    console.error(err);
  }
});


function checkAnyThing(file) {
  fs.access(file, (err)=> {
    try {
      if (err) throw "Error1";
      else readAnyThing(file);
    } catch (err) {
      console.error(err);
    }
  });
}


function readAnyThing(file) {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) throw "Error2";
    else appendAnyThing(file, 'abc')
  });
}

function appendAnyThing(file, data) {
  fs.appendFile(file, data, (err)=> {
    if (err) throw "Error3";
    else console.log('done');
  });
}