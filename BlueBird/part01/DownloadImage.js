'use strict';

/**
 * Created by baohg on 01/06/2016.
 */
var fs = require('fs');
var request = require('request');
var bluebird = require('bluebird');

var photoLink = 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050';

function NoPromise() {
  var name = 'dog-01.jpg';
  console.time('download');
  request.get(photoLink)
    .on('error', function (err) {
      console.log('Download error', err);
    })
    .pipe(fs.createWriteStream(name)
      .on('finish', function () {
        console.timeEnd('download');
        console.log('Done write to file');
      }).on('error', function (err) {
        console.log('Error write to file: ', err);
      })
    );
}

function Promise() {
  var name = 'dog-02.jpg';
  function getPhoto(photoLink){
    return new bluebird.Promise(function(fulfill, reject) {
      request.get(photoLink)
        .on('error', function (err) {
          err.photo = photoLink;
          reject(err);
        })
        .pipe(fs.createWriteStream(name)
          .on('finish', function () {
            fulfill(name);
          }).on('error', function (err) {
            reject(err);
          })
        );
    });
  }

  getPhoto(photoLink)
    .then(function(result){
      console.log('Done write to file', result);
    }).catch(function(err){
    console.log('Error: ', err.message);
  });

}

//NoPromise();
Promise()