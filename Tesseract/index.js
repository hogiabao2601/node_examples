'use strict';

/**
 * Created by baohg on 12/07/2016.
 */
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const tesseract = require('node-tesseract');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const async = require('async');
var getPixels = require("get-pixels")
var savePixels = require("save-pixels")
var zeros = require("zeros")

var STORE = {
  baseUrl: 'https://isacombank.com.vn/corp/',
}
function getLoginPage(cb) {
  console.log('Truy cập trang đăng nhập');
  request.get({
    url: 'https://www.isacombank.com.vn/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&AuthenticationFG.PREFERRED_LANGUAGE=003&LANGUAGE_ID=003',
  }, (error, res, body) => {
    if (error) {
      console.error(error);
    } else {
      var $ = cheerio.load(body);
      STORE.captchaGUID = $('#IMAGECAPTCHA').attr('src');
      STORE.captchaPath = __dirname + '/captcha.jpg'
      downloadImageCaptcha(cb);
    }
  })

  function downloadImageCaptcha(cb) {
    console.log('Tải Captcha');
    request({
      url: STORE.baseUrl + STORE.captchaGUID,
    }).pipe(fs.createWriteStream(STORE.captchaPath))
      .on('close', function () {
        cb();
      })
      .on('error', function (error) {
        console.error(error);
      });
  }
};

function rgb2Gray(cb) {
  getPixels(STORE.captchaPath, function (err, pixels) {
    if (err) {
      console.log("Bad image path")
      return
    }

    var nx = pixels.shape[0]
    var ny = pixels.shape[1]

    var gray = zeros([nx, ny, 3])

    for (var i = 1; i < nx - 1; ++i) {
      for (var j = 1; j < ny - 1; ++j) {
        let color = 0.2989 * pixels.get(i, j, 0) + 0.5870 * pixels.get(i, j, 1) + 0.1140 * pixels.get(i, j, 2)
        gray.set(i, j, 0, color)
        gray.set(i, j, 1, color)
        gray.set(i, j, 2, color)
      }
    }
    savePixels(gray, "png").pipe(fs.createWriteStream(STORE.captchaPath))
      .on('close', function () {
        cb();
      })
      .on('error', function (error) {
        console.error(error);
      })
  })
}

function readCaptcha(cb) {
  tesseract.process(STORE.captchaPath, function (err, text) {
    if (err) {
      console.error(err);
    } else {
      console.log('=========');
      console.log(text.trim());
      cb();
    }
  });
}

//readCaptcha(()=>{})
async.series([
  getLoginPage,
  RGB2GRAY,
  readCaptcha,
])


