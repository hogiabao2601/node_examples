'use strict';

/**
 * Created by baohg on 29/07/2016.
 */

var PythonShell = require('python-shell');

var options = {

  args: ['/home/baohg/IdeaProjects/node_examples/Tesseract/captcha_files/ECE11/1C0VO8SNWRQV.jpg']
};

console.time('ab')
PythonShell.run('decaptcha.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
  console.timeEnd('ab')
});


//const exec = require('child_process').exec;
//exec('python decaptcha.py ', (error, stdout, stderr) => {
//  if (error) {
//    console.error(`exec error: ${error}`);
//    return;
//  }
//  console.log(`stdout: ${stdout}`);
//  console.log(`stderr: ${stderr}`);
//});

//const execFile = require('child_process').execFile;
//const child = execFile('', (error, stdout, stderr) => {
//  if (error) {
//    throw error;
//  }
//  console.log(stderr);
//  console.log(stdout);
//});
