'use strict';

/**
 * Created by baohg on 27/05/2016.
 */
function doSomeAsynchronousOperation(cb){
  console.log("abc");
  cb(null);
}


try {
  doSomeAsynchronousOperation(function (err) {
    if (err)
      throw (err);
    /* continue as normal */
  });
} catch (ex) {
  console.log("bcd");
}