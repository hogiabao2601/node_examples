'use strict';

/**
 * Created by baohg on 08/08/2016.
 */
const async = require('async');
const fs = require('fs');

async.concat(['/home/baohg/IdeaProjects/node_examples/Async/src'], fs.readdir, function (error, files) {
  if (error) return console.log(error)
  return console.log(files);
});
