'use strict';

/**
 * Created by baohg on 14/06/2016.
 */
const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const cheerio = require('cheerio');

var login_page = 'https://ebanking.vietinbank.vn/ipay/timeout.do';

request.get(login_page, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    var check_user_page = 'https://ebanking.vietinbank.vn/ipay/j_spring_security_check';
    var param = {
      url: check_user_page,
      form: {
        j_username: "tunshin19",
        j_password: "55120379",
        locale: "vi",
        btnLogin: ""
      }
    };
    request.post(param, (err, res, body) => {
      if (err) {
        console.error(err);
      } else {
        var cookie = res.headers['set-cookie'];
        var cookieParsed = [];
        for (var i = 0; i < cookie.length; i++) {
          cookieParsed.push(cookie[i].split(';')[0]);
        }
        cookieParsed = cookieParsed.join('; ');
        var home_page1 = 'http://ebanking.vietinbank.vn/ipay/home.do?locale=vi'
        var param = {
          url: home_page1,
          headers: {
            Cookie: cookieParsed
          }
        };
        request.get(param, (err, res, body) => {
          if (err) {
            console.error(err);
          } else {
            var transfer_page = 'https://ebanking.vietinbank.vn/ipay/finance/fundTranferAction.do'
            var param = {
              url: transfer_page,
              headers: {
                Cookie: cookieParsed
              }
            };
            request.get(param, (err, res, body) => {
              if (err) {
                console.error(err);
              } else {
                var $ = cheerio.load(body);
                $('select#frAcct').children('option').first().remove();
                var data = $('select#frAcct').children('option');
                console.log(data.text());
                //console.log(frAcct);
                fs.writeFile('abc.html', body)
              }
            });

          }
        })
      }
    });


  }


})