'use strict';

/**
 * Created by baohg on 21/07/2016.
 */
var firstMethod = function() {
  var promise = new Promise(function(resolve, reject){
    setTimeout(function() {
      console.log('first method completed');
      resolve({data: '123'});
    }, 2000);
  });
  return promise;
};


var secondMethod = function(someStuff) {
  var promise = new Promise(function(resolve, reject){
    setTimeout(function() {
      console.log('second method completed');
      resolve({newData: someStuff.data + ' some more data'});
    }, 2000);
  });
  return promise;
};

var thirdMethod = function(someStuff) {
  var promise = new Promise(function(resolve, reject){
    setTimeout(function() {
      console.log('third method completed');
      resolve({result: someStuff.newData});
    }, 3000);
  });
  return promise;
};

firstMethod()
  .then(secondMethod)
  .then(thirdMethod)
  .then((someStuff)=>{
    console.log(someStuff);
  });