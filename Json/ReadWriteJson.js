'use strict';

/**
 * Created by baohg on 27/06/2016.
 */
var fs = require('fs');

var STORE = {};
STORE.demo4 = "demo5";
STORE.demo1 = "demo10";
//STORE.demo2 = "demo2";
//STORE.demo3 = "demo3";

//fs.writeFile('json.txt', JSON.stringify(STORE), (err) =>{
//});

fs.readFile('json.txt',  (err, data) =>{
  var obj = JSON.parse(data);
  Object.keys(obj).forEach(function(key) {
    var val = obj[key];
    STORE[key] =val
  });
});