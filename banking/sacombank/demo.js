'use strict';

/**
 * Created by baohg on 14/06/2016.
 */

//var CryptoJS = require("crypto-js");
//
//console.log(CryptoJS.AES.encrypt("data", "secret") + "");
//console.log(Math.random());
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


const request = require('request');


var url = 'https://www.isacombank.com.vn/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&AuthenticationFG.PREFERRED_LANGUAGE=003&LANGUAGE_ID=003'

request.get(url, (err, res, body) =>{
  console.log(res);
  if (err){
    console.error(err);
  }else{
    console.log(res);
  }
});