'use strict';

/**
 * Created by baohg on 06/06/2016.
 */

var request = require('request');

var USER_INFO = {
  username: '0101580617',
  password: '081288',
  payload: '7|2|5|https://ebanking.dongabank.com.vn/khcn/resources/home/|F7EE35E3C349A84C93DF1F4D2B1CB7CC|com.dtsc.gwt.client.core.client.data.RpcTokenDtsc/1025630141|com.dtsc.ebankinternet.share.main.shared.service.PortalRpcQueryService|getLinkIntroPage|1|2|3|0|0|0|4|5|0|'

}


request.get('https://ebanking.dongabank.com.vn/khcn/main', function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    var url = response.request.uri.href;
    var cookie = url.split(';')[1];
    request.get(url, function (error, response, body) {
      //console.log(response.headers['set-cookie']);
      var url = 'https://ebanking.dongabank.com.vn/khcn/j_spring_security_check';
      var para = {
        url: url,
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
      }

      request.post(para, function (error, response, body) {
        var cookie = response.headers['set-cookie'];
        var JSESSIONID = cookie[0].split(';')[0];
        var dab_user = cookie[1].split(';')[0];
        //console.log(response.request);
        var url = 'https://ebanking.dongabank.com.vn/khcn/resources/home/portalRpcQueryService';
        var para = {
          url: url,
          headers: {
            Host: 'ebanking.dongabank.com.vn',
            Origin: 'https://ebanking.dongabank.com.vn',
            Pragma: 'no-cache',
            Referer:'https://ebanking.dongabank.com.vn/khcn/home',
            Cookie: `${JSESSIONID}; dab_client_version=1.0.12-PROD; dab_main_version=1.0.12-PROD; COOKIE_SUPPORT=true; show_popup_khcn=1; __utma=254116060.766701227.1465182293.1465183429.1465265443.2; __utmc=254116060; __utmz=254116060.1465183429.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID=CFBEC7F42957B56B87D7E50595509F57C0CB9ECA118A8483C35BCEFC1D35F84D.S7_hniloaboh_31; _gat=1; GUEST_LANGUAGE_ID=vi_VN; _ga=GA1.3.766701227.1465182293; ${dab_user}; dab_type=0`,
          },
          body: USER_INFO.payload
        }
        console.log(para);
        request.post(para, function (error, response, body) {
          console.log(response.statusCode);
          console.log('----------------');
          Object.keys(response).forEach(function (key) {
            console.log(key);
          });
        });


      });
    });
  }
});