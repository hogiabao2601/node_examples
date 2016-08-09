'use strict';

/**
 * Created by baohg on 11/07/2016.
 */

const spawn = require('child_process').spawn;

const ls = spawn('df', ['-h']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


