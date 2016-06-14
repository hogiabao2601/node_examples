'use strict';

/**
 * Created by baohg on 14/06/2016.
 */

var CryptoJS = require("crypto-js");

console.log(CryptoJS.AES.encrypt("data", "secret") + "");
console.log(Math.random());
//
//var ZERO_ARRAY
//
//function setMaxDigits(value) {
//  var maxDigits = value;
//  ZERO_ARRAY = new Array(maxDigits);
//  for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
//  var bigZero = new BigInt();
//  var bigOne = new BigInt();
//  bigOne.digits[0] = 1;
//
//  console.log(bigOne);
//}
//
//function BigInt(flag) {
//  if (typeof flag == "boolean" && flag == true) {
//    this.digits = null;
//  } else {
//    this.digits = ZERO_ARRAY.slice(0);
//  }
//  this.isNeg = false;
//}
//
//
//setMaxDigits(131)