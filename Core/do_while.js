'use strict';

/**
 * Created by baohg on 11/07/2016.
 */

function randomFunc() {
  return Math.random() * (0.8 - 0);
}

function transfer() {
  try {
    var ran = randomFunc();
    console.log(ran);
    if (ran < 0.5) {
      throw Error('Two args required');
    }
    return true;
  } catch (ex) {
    return false;
  }

}

var retry = 1;
do {
  var isTransferred = transfer();
  console.log(`Try ${retry}`);
  retry++;
}
while (!isTransferred && retry <= 10);

const request = require('request')

request.get()

var qs = require('querystring')
var a = qs.stringify({
    id: '1',
    email: 'thuonghh@mecorp.vn',
    phone: '84909000200',
    content: 'noidungsms',
    service: 'mgo',
    send_sms: '1/0',
    send_mail: '1/0',
    part: 'studio',
    account: 'studio',
    token: 'token'
  }
)

console.log(a);