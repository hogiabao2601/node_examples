'use strict';

/**
 * Created by baohg on 13/06/2016.
 */
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var encryptUsingJS = require('./EncryptPassword').encryptUsingJS;

var readLine = require('readline');

var login_page = {
  url: 'https://www.isacombank.com.vn/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&AuthenticationFG.PREFERRED_LANGUAGE=003&LANGUAGE_ID=003',
};

var userName = 'tunshin'
var PASSWORD = 'borntolove11'

request.get(login_page, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
    var $ = cheerio.load(body);
    var encrypt_key = $('input[name="__JS_ENCRYPT_KEY__"]').val();
    var loginUrl = "https://www.isacombank.com.vn/corp/" + $('form[name="AuthenticationFG"]').attr('action');
    var encryptedPassword = encryptUsingJS(PASSWORD, encrypt_key);
    var actionValidateCredentials = $('input[name="Action.VALIDATE_CREDENTIALS"]').val();
    var formGroupId = $('input[name="FORMSGROUP_ID__"]').val();
    var reportTitile = $('input[name="AuthenticationFG.REPORTTITLE"]').val();
    request({
      url: "https://isacombank.com.vn/corp/" + $('#IMAGECAPTCHA').attr('src'),
    }).pipe(fs.createWriteStream(__dirname + '/captcha.png'))
      .on('close', function () {
      })
      .on('error', function () {
      });

    const line = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var qs = loginUrl.split('?')[1];


    line.question("Nhập captcha:  ", (captcha) => {
      var form = {
        "AuthenticationFG.USER_PRINCIPAL": userName,
        "AuthenticationFG.ACCESS_CODE": encryptedPassword,
        "AuthenticationFG.VERIFICATION_CODE": captcha,
        "Action.VALIDATE_CREDENTIALS": actionValidateCredentials,
        "FORMSGROUP_ID__": formGroupId,
        "AuthenticationFG.REPORTTITLE": "AuthenticationScreen",
        "__JS_ENCRYPT_KEY__": encrypt_key,
      };

      var param = {
        url: loginUrl,
        form: form,
      }

      var querystring = require('querystring');
      //param.headers['Content-Length'] = querystring.stringify(form).length + 80
      //console.log(param);
      //request.post(param, (error, response, body) => {
      //  if (error) {
      //    console.log(error);
      //  } else {
      //    console.log(response.statusCode);
      //    fs.writeFile('abc0.html', body);
      //  }
      //})

      console.log(param);
      request.post(param, (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response.statusCode);
          fs.writeFile('abc1.html', body);
        }
      })


    });
  }
});







