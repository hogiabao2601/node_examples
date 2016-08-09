'use strict';

/**
 * Created by baohg on 19/07/2016.
 */

const getPixels = require("get-pixels")
const savePixels = require("save-pixels")
const zeros = require("zeros")
const tesseract = require('node-tesseract');
const fs = require('fs');
const async = require('async');

var STORE = {
  captchaPath: '/home/baohg/IdeaProjects/node_examples/Tesseract/captcha.jpg',
  captchaGrayPath: '/home/baohg/IdeaProjects/node_examples/Tesseract/captcha-gray.jpg'
};

function rgb2Gray(cb) {
  getPixels(STORE.captchaPath, function (err, pixels) {
    if (err) {
      console.log("Bad image path")
      cb(err)
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
    savePixels(gray, "png").pipe(fs.createWriteStream(STORE.captchaGrayPath))
      .on('close', function () {
        cb(null);
      })
      .on('error', function (error) {
        console.error(error);
        cb(err)
      })
  })
};


function deCaptcha(cb) {
  tesseract.process(STORE.captchaGrayPath, function (err, text) {
    if (err) {
      console.error(err);
      cb(err)
    } else {
      cb(null, text.trim());
    }
  });
}

function decryptCaptcha() {
  console.log('Giải mã Captcha');
  async.series([
    rgb2Gray,
    deCaptcha
  ], (error, results) => {
    if (error) {

    } else {
      var captcha = results[1]
      STORE.inputCaptcha = captcha;
      console.log(captcha);
    }
  })
}

decryptCaptcha();