'use strict';

/**
 * Created by baohg on 17/08/2016.
 */

var otp = require('otplib/lib/authenticator');

var lib = require('otplib');
var totp = lib.totp;

// base 32 encoded user secret key
var secret = 'GJLVGTLHMNUVEK32';
console.log(secret);
//// otp code
//var code = otp.generate(secret);
//
//console.log(code);
//
//var status = otp.check(code, secret);
//console.log(status);
//
//code = '235116'
//console.log(code);
//var status = otp.check(code, secret);
//console.log(status);

var code = totp.generate(secret);
console.log(code);