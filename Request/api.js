'use strict';

/**
 * Created by baohg on 08/06/2016.
 */
var request = require('request');
var async = require('async');
var readLine = require('readline');


var host = "https://ebanking.dongabank.com.vn";
var cookie;


function login(callback) {
  console.log("Đăng nhập tài khoản");
  var path = "/khcn/services/authenticate.json";
  var url = host + path;
  var form = {
    j_username: '0101580617',
    j_password: '081288',
    j_locale: 'vi',
    j_customer_type: 'KHCN'
  };
  var param = {
    url: url,
    qs: form
  };

  request.get(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
      cookie = res.headers['set-cookie'][0].split(';')[0];
    }
    callback(null);
  });

}

function checkStatus(callback) {
  console.log("Kiểm tra tài khoản");
  var path = "/khcn/services/checkStatus?j_webkit_version=1.1.11";
  var url = host + path;
  var param = {
    url: url,
    headers: {
      'Cookie': cookie,
    },
  };
  request.get(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
    }
    callback(null);
  });

}

function getUserConfig(callback) {
  console.log("Kiểm tra cấu hình người dùng");
  var path = "/khcn/services/serviceManager/getUserConfig.json";
  var url = host + path;
  var param = {
    url: url,
    headers: {
      'Cookie': cookie,
    },
  };
  request.get(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
    }
    callback(null);
  });

}

function transferMoney1(callback) {
  console.log("Chuyển tiền1");
  var path = '/khcn/services/serviceManager/execute.json';
  var url = host + path;

  var form = {
    param: '{"params":["DS_CK_CK",null]}'
  };
  var param = {
    url: url,
    headers: {
      'Cookie': cookie,
    },
    form: form
  };

  request.post(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
    }
    callback(null);
  });
}

function transferMoney2(callback) {
  console.log("Chuyển tiền2");
  var path = '/khcn/services/serviceManager/execute.json';
  var url = host + path;

  var form = {
    param: '{"params":["DS_CK_CK_CKF",{"accountNo":["0"]}]}'
  };
  var param = {
    url: url,
    headers: {
      'Cookie': cookie,
    },
    form: form
  };

  request.post(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
    }
    callback(null);
  });
}

function transferMoney3(callback) {
  console.log("Chuyển tiền3");
  var path = '/khcn/services/serviceManager/execute.json?_dc=1465375431585';
  var url = host + path;

  var form = {
    param: '{"params":["DS_CK_CK_CT",{"DS_CK_CK_CKF":["01"],"account":["0103150408"],"money":["50000"],"description":["Djdjs"],"confirmType":["0"]}]}'
  };
  var param = {
    url: url,
    headers: {
      'Cookie': cookie,
    },
    form: form
  };

  request.post(param, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
      console.log(res.body);
    }
    callback(null);
  });
}

function authenticateOTP(callback) {
  console.log("Xác nhận OTP");
  var path = '/khcn/services/serviceManager/execute.json';
  var url = host + path;

  const line = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  line.question("Nhập OTP:  ", function (otp) {
    var otp = otp;
    var form = {
      param: `{"params":["DS_CK_CK_CF",{"confirm":["${otp}"],"addAccount":[]}]}`
    };
    var param = {
      url: url,
      headers: {
        'Cookie': cookie,
      },
      form: form
    };

    request.post(param, function (err, res, body) {
      if (err) {
        console.error(err);
      } else {
        console.log(res.body);
      }
      callback(null);
    });

  });



}



async.series([
  login,
  //checkStatus,
  //getUserConfig,
  transferMoney1,
  transferMoney2,
  transferMoney3,
  authenticateOTP,
]);