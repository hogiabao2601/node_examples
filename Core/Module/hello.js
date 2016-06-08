'use strict';

/**
 * Created by baohg on 06/06/2016.
 */
var client;

function abc(callback) {
  if(client){
    callback(client);
    return;
  }
  client = 'hello azinomoto';

  callback(client);
};

abc((client)=>{
  console.log(client);
});

module.exports = abc;

