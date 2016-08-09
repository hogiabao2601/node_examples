'use strict';

/**
 * Created by baohg on 21/06/2016.
 */

var fs = require('fs');
var cheerio = require('cheerio');
var html = fs.readFile('abc.html', (err, html) => {


})

var $ = cheerio.load(`<ul class="page-colum">
			<li>Tài khoản chuyển: <span>711AD0596954 - A - VND</span></li>
			<li>Tài khoản/Số thẻ nhận: <span>102010000100452 - D - VND</span></li>
			<li>Tên người nhận: <span>TR DAI HOC CONG NGHE TPHCM</span></li>
		</ul>
		<ul class="page-colum">
			<li>Số tiền chuyển:<span>50,000.00&nbsp;VND</span></li>
			<li>Số tiền bằng chữ: <span>Năm mươi ngàn đồng chẵn./.</span></li>
			<li>Nội dung: <span>abc</span></li>
		</ul>
		<ul class="page-colum">
			<li>Phí giao dịch: <span>1,100.00&nbsp;VND</span></li>
			<li></li>
			<li></li>
		</ul>`);

//var ul = $('ul[class="page-colum"]').eq(0);
//$ = cheerio.load(ul.toString());
//console.log($('span').eq(1).text());
//console.log($('span').eq(2).text());

var request = require('request');
var param ={
  "url": "https://ebanking.vietinbank.vn/ipay/finance/fundTranferAction.do",
  "headers": {
    "Cookie": "TS0178a009=01225a53352f1064abfbc7d0db3ecdc7989c9bf402b31ce39454b88b711f76e2188ffb1e7ec3ee8e5c827cf41208b9e8799ef16e5a; JSESSIONID=PLrBXrqG18PYnhy3SXCQp44b1L64L6xF6V0MdCg5hG66znwDym26!-58188657; TS0152b83e=0127f264cc7da1a221feaf4a7f8fde5f9eb5dd2a5ef50a562479e195fad534adcf5f1ea7e2d11f2a8f30ceddef4d5773fd66951aab; citrix_ns_id=RTLbRX2B8dgbSDRaSbfpcrklghw0002; __utma=154886719.1788797210.1465784663.1466645955.1466648841.7; __utmc=154886719; __utmz=154886719.1466648841.7.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); TS01cc7701_30=01df758f9deeadccc5089790ea9e2d93d33303c6ce7ca4cea2ad52586727ea8d9cb0a44d04089bd77d53dcf53ccd09094e8464025f; TS01cc7701=01225a5335beb7aba4f3209c5c45c971c8e76356949544d4485ab9a9115d699aaaf56e9a3f; _gat=1; TS01e66f36_30=01b4894e23d4ae571275fcd405e6c90c3d92b347105efbeb7ae39eece54fc87254cb0e370cd72a20cf6ecf23560b7f7a8bbec5741b; _ga=GA1.2.1788797210.1465784663; TS01e66f36=0127f264cc95731f23d1541e6a52a5b5c4e49143b23b0c2469bd15aca5257cd44984427493; NSC_jQbz-G5-TTM=ffffffff090ffd4345525d5f4f58455e445a4a422858"
  },
  "form": {
    "frAcct": "711AD0596954,A,VND,0",
    "toAcct": "102010000100452",
    "amt": 50000,
    "memo": "Kiem Tra Thong Tin Tai Khoan",
    "currency": "VND",
    "ACTION": "PRE_CONFIRM",
    "frAcctNo": "711AD0596954",
    "frAcctType": "A",
    "frAcct_alias": "0",
    "securityCode": "SMS",
    "org.apache.struts.taglib.html.TOKEN": "9123f46bc3940d2bc4775832fcb17e20"
  }
}
request.post(param, (err, res, body) => {
  console.log(body);
  var $ = cheerio.load(body);
  var ul = $('ul[class="page-colum"]').eq(0);
  $ = cheerio.load(ul.toString());
  var accountNumber = $('span').eq(1).text();
  var accountName = $('span').eq(2).text();

  var data = {
    SoTaiKhoan: accountNumber,
    TenChuKhoan:  accountName
  };
  console.log(data);
})