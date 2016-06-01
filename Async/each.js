'use strict';

/**
 * Created by baohg on 30/05/2016.
 */

var async = require('async');
var fs = require('fs');

//var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var openFiles = ["/test.json", "/prod.json", "/dev.json"];

async.eachSeries(openFiles, function (file, callback) {
  console.log('Processing file ' + file);
  fs.readFile(__dirname + file, "utf8", function (err, data) {
    if (err) return callback(err);
    try {
      var configs = JSON.parse(data);
      console.log(configs);
    } catch (e) {
      return callback(e);
    }
    callback();
  });
  }, function (err) {
    // if any of the saves produced an error, err would equal that error
    if (err) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
    }
  }
);

//openFiles.forEach(function (file, cb) {
//  console.log('Processing file ' + file);
//  fs.readFile(__dirname + file, "utf8", function (err, data) {
//    try {
//      var configs = JSON.parse(data);
//      console.log(configs);
//      cb();
//    } catch (e) {
//    }
//  });
//});
//console.log('All files have been processed successfully');
//



//var configs = {};
//
//var c = 1;
//async.forEachOf(obj, function (value, key, callback) {

//    //callback();
//  });
//}, function (err) {
//  if (err) console.error(err.message);
//  // configs is now a map of JSON data
//  console.log(c);
//  //doSomethingWith(configs);
//})
//
//
//function doSomethingWith(cfg) {
//  console.log(cfg);
//}
////async.waterfall([
////  function (cb) {
////
////    cb(null);
////  }
////], function (err, result) {
////  console.log("abcd");
////});
//
//
//var processedDevice = ["/dev.json"];
//var addBulk = [];
//var updateBulk = [];
//var deleteDeviceBulk = [];
//var count = 0;
//var devices = ["/dev.json", "/test.json"];
//
//async.forEachOf(devices, function (value, key, callback) {
//  if (processedDevice.indexOf(value) <= -1) {
//    fs.readFile(__dirname + value, "utf8", function (err, data) {
//      if (err) return callback(err);
//      try {
//        //configs[key] = JSON.parse(data);
//        updateBulk.push(data);
//        //console.log(updateBulk);
//      } catch (e) {
//        return callback(e);
//      }
//    });
//  } else {
//    addBulk.push(value);
//  }
//  if (devices.length === updateBulk.length + addBulk.length)
//    callback(null);
//}, function (err) {
//  if (err) console.error(err);
//  console.log(updateBulk);
//});
//
//
////async.forEachOf(devices, function (value, key, callback) {
////  var deviceToken = value.a.toString();
////  var obj = {b: 1, c: 2};
////  if (processedDevice.indexOf(deviceToken) <= -1) {
////    addBulk.push(obj);
////    processedDevice.push(deviceToken);
////  } else {
////    updateBulk.push(deviceToken);
////  }
////  deleteDeviceBulk.push(deviceToken);
////  console.log(addBulk);
////  callback();
////}, function (err) {
////  console.log(addBulk);
////});
//
//
///*async.forEachOf(obj, function (value, key, callback) {
// fs.readFile(__dirname + value, "utf8", function (err, data) {
// if (err) return callback(err);
// try {
// configs[key] = JSON.parse(data);
// } catch (e) {
// return callback(e);
// }
//
// });
// callback();
// }, function (err) {
// if (err) console.error(err.message);
// // configs is now a map of JSON data
// doSomethingWith(configs);
// });*/

//var async = require('async');
//var data = [1, 2, 3 , 4, 5];
//var data2 = [];
//
//function addOne(element, cb) {
//  element += element;
//  data2.push(element)
//  cb();
//}
//
//async.each(data, addOne, function(err) {
//  if (err) console.log(err);
//  console.log('END', data2);
//});
