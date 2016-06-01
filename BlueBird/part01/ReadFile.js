'use strict';

/**
 * Created by baohg on 01/06/2016.
 */

var fs = require('fs');
var bluebird = require("bluebird");

console.time('xx');
var readFileAsync = bluebird.promisify(fs.readFile);
console.timeEnd('xx');

readFileAsync("part01/bad.json")
  .then(function (val) {
    return JSON.parse(val);
  })
  .then(function (json) {
    console.log(json);
  }).catch(SyntaxError, function (e) { //Bắt lỗi parse JSON trước
    console.error("invalid json in file", e.message);
  })
  .catch(function (e) { //Bắt lỗi đọc file
    console.error("unable to read file", e.message);
  });


/*
 var fs = require('fs');
 var promise = require('bluebird');
 promise.promisifyAll(fs); //Chuyển tất cả các hàm trong fs sang dạng Promise

 fs.readFileAsync("good.json").then(JSON.parse).then(function(json) {
 console.log(json);
 }).catch(SyntaxError, function(e) {
 console.error("invalid json in file", e.message);
 }).catch(function(e){
 console.error("unable to read file", e.message);
 });
 */

//var promise = require('bluebird');
//console.time('3123');
//var readFileAsync = promise.promisify(fs.readFile);  //chỉ convert duy nhất hàm fs.readFile
//
//readFileAsync("bad.json")
//  .then(JSON.parse)
//  .then(function (json) {
//    console.log(json);
//  })
//console.timeEnd('3123');  //Mất khoảng 2 milisecond
