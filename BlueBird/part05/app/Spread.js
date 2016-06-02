'use strict';

/**
 * Created by baohg on 02/06/2016.
 */

const bluebird = require('bluebird');
const fs = require('fs');

var readFileAsync = bluebird.promisify(fs.readFile);

function spard() {
  bluebird.resolve().then(function () {
    return [readFileAsync("/home/baohg/IdeaProjects/node_examples/BlueBird/part05/app/test.txt", 'utf8'),
      readFileAsync("/home/baohg/IdeaProjects/node_examples/BlueBird/part05/app/test2.txt", 'utf8')];
  }).spread(function (file1text, file2text) {
    if (file1text === file2text) {
      return "files are equal";
    } else {
      return "files not are equal";
    }
  }).catch(function (err) {
    console.log(err.message);
  });
}

module.exports.spard = spard;

console.log(spard());