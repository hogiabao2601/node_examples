'use strict';

/**
 * Created by baohg on 08/06/2016.
 */
var request = require('request');


var tokenUrl = 'https://ebanking.dongabank.com.vn/khcn/resources/main/tokenService';
var param = {
  url: tokenUrl,
  headers: {
    //Cookie: loginCookie,
    Host: 'ebanking.dongabank.com.vn',
    Connection: 'keep-alive',
    'Content-Length': 245,
    'X-GWT-Module-Base': 'https://ebanking.dongabank.com.vn/khcn/resources/main/',
    'X-GWT-Permutation': '40C4A672ECEE84A4E02AB4D31AC22092',
    'Origin': 'https://ebanking.dongabank.com.vn',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
    Referer: 'https://ebanking.dongabank.com.vn/khcn/main',
    'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
    'Cookie': 'JSESSIONID=B66D89E7273BC7AECB9170E344A99838.khcn-ins1; dab_client_version=1.0.12-PROD; dab_main_version=1.0.12-PROD; JSESSIONID=9171F2D83DBA5553EEE16F52AC2B64E502664CB1AB19AF919C1DC7647E097908.S7_hniloaboh_31; GUEST_LANGUAGE_ID=vi_VN; COOKIE_SUPPORT=true; show_popup_khcn=1; dab_user=PHAM+HO+CONG+TRUNG; dab_type=0; _ga=GA1.3.698817547.1465352798; __utma=254116060.698817547.1465352798.1465353277.1465353277.1; __utmb=254116060.1.10.1465353277; __utmc=254116060; __utmz=254116060.1465353277.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
  },
  body :'7|2|5|https://ebanking.dongabank.com.vn/khcn/resources/main/|B5E785B4D46D2B673F9CD92265EDD955|com.dtsc.gwt.client.core.client.data.RpcTokenDtsc/1025630141|com.dtsc.gwt.client.core.client.shared.service.TokenService|getNewToken|1|2|3|0|0|0|4|5|0|'
};
request.post(param, (error, response, body) => {
  console.log(response.headers);
  console.log(response.body);
})