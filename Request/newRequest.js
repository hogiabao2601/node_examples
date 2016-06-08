'use strict';

/**
 * Created by baohg on 07/06/2016.
 */

var request = require('request');
var fs = require('fs');

var USER_INFO = {
  username: '0101580617',
  password: '081288',
  payload: '7|2|5|https://ebanking.dongabank.com.vn/khcn/resources/main/|B5E785B4D46D2B673F9CD92265EDD955|com.dtsc.gwt.client.core.client.data.RpcTokenDtsc/1025630141|com.dtsc.gwt.client.security.shared.service.LoginService|checkLoggedIn|1|2|3|0|0|0|4|5|0|'

  //7|2|5|https://ebanking.dongabank.com.vn/khcn/resources/main/|B5E13A5F29019004A1D9A5BA4F07F785|com.dtsc.gwt.client.core.client.data.RpcTokenDtsc/1025630141|com.dtsc.gwt.client.core.client.shared.service.TokenService|getNewToken|1|2|3|0|0|0|4|5|0|

}


var cookie = 'JSESSIONID=C4A12CB16EF542B2700427E4A6630A4A.khcn-ins3';
var mainUrl = 'https://ebanking.dongabank.com.vn/khcn/main';
var param = {
  url: mainUrl,
  headers: {
    'Cookie': cookie,
  },
};

var securityCheckUrl = 'https://ebanking.dongabank.com.vn/khcn/j_spring_security_check';
var param = {
  url: securityCheckUrl,
  followAllRedirects: true,
  headers: {
    'Cookie': cookie,
  },
  form: {
    j_username: USER_INFO.username,
    j_password: USER_INFO.password,
    j_customer_type: 'KHCN',
    username: USER_INFO.username,
    password: USER_INFO.password
  }
};


var loginCookie;
request.post(param, (error, response, body) => {
  if (error) {
    console.error(error);
  }
  else {


    loginCookie = response.headers['set-cookie'][0].split(';')[0];
    var mainUrl = 'https://ebanking.dongabank.com.vn/khcn/main';
    var param = {
      url: mainUrl,
      headers: {
        Cookie: loginCookie,
      },
    };
    request.get(param, function (error, response, body) {
      console.log(response.statusCode);
      fs.writeFile('cookie.txt', loginCookie);
      fs.writeFile('a.html', response.body);
      var tokenUrl = 'https://ebanking.dongabank.com.vn/khcn/resources/main/tokenService';
      var param = {
        url: tokenUrl,
        headers: {
          //Cookie: loginCookie,
          Host: 'ebanking.dongabank.com.vn',
          Connection: 'keep-alive',
          'Content-Length': 245,
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache',
          'X-GWT-Module-Base': 'https://ebanking.dongabank.com.vn/khcn/resources/main/',
          'X-GWT-Permutation': '40C4A672ECEE84A4E02AB4D31AC22092',
          'Origin': 'https://ebanking.dongabank.com.vn',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
          'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
          Referer: 'https://ebanking.dongabank.com.vn/khcn/main',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
          'Cookie': 'JSESSIONID=B66D89E7273BC7AECB9170E344A99838.khcn-ins1; dab_client_version=1.0.12-PROD; dab_main_version=1.0.12-PROD; JSESSIONID=9171F2D83DBA5553EEE16F52AC2B64E502664CB1AB19AF919C1DC7647E097908.S7_hniloaboh_31; GUEST_LANGUAGE_ID=vi_VN; COOKIE_SUPPORT=true; show_popup_khcn=1; dab_user=PHAM+HO+CONG+TRUNG; dab_type=0; _ga=GA1.3.698817547.1465352798; __utma=254116060.698817547.1465352798.1465353277.1465353277.1; __utmb=254116060.1.10.1465353277; __utmc=254116060; __utmz=254116060.1465353277.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',


        },
      };
      request.post(param, (error, response, body) => {
        console.log(response.headers);
        console.log(response.body);
      })


    });
  }
});


//
//

//

//
//
