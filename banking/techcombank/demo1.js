'use strict';

/**
 * Created by baohg on 21/06/2016.
 */

var fs = require('fs');
var cheerio = require('cheerio');
var html = fs.readFile('abc.html', (err, html) =>{


})

var $ = cheerio.load(`<form id="rsaform" method="post" target="/servlet/BrowserServlet" action="/servlet/BrowserServlet"><input type="hidden" name="formToken" value="1C134B4F5F0FFD9F136A50FACE1EC7188ED00282E1BF500209">
				<div class="qwfieldset authen_panel">
					<div id="qwfs_title" class="authen_panel_title">Xác thực giao dịch</div>
					<div id="qwfs_content" class="authen_content">
						<div id="authen_iconLeft">&nbsp;</div>
						<div id="authen_rightcol">
							<div class="left_row" style="width:120px;">Tên truy cập:</div>
							<div class="right_row" style="width:100px"><input readonly="readonly" type="text" name="rsa_userid" value="HOVIETTHUYEN" style="width: 155px" /></div>
							<div class="left_row" style="width:120px" >Mật khẩu:</div>
							<div class="right_row" style="width:100px"><input tabindex="1" type="password" name="userPin" id="userPin" style="width: 155px" title="Mật khẩu" /></div>
							<div class="left_row" style="width:120px" >Số Token /SMS OTP:</div>
							<div class="right_row" style="width:100px"><input tabindex="1" type="password" name="tokenCode" id="tokenCode" onKeyPress="javascript:submitOnEnter(event)" style="width: 155px" title="Số Token/SMS OTP" /></div>
							<!-- <div class="right_row" style="width:120px"><input tabindex="1" type="password" name="rsa_passcode" id="rsa_passcode" onKeyPress="javascript:submitOnEnter(event)" style="width: 155px" /></div> -->
							<div><input tabindex="1" type="hidden" name="rsa_passcode" id="rsa_passcode"/></div>
							<div class="right_row" id="lgn_error" style="color: red; font-size: 12px; font-weight: bold; position: relative; width: 96%; left: 16px;" >Vui lòng nhập mật khẩu và số Token /SMS OTP
</div>
						</div>
						<div class="right_row authen_btn_panel">
							<a href="javascript:validateForm(window.document.forms['rsaform'])" class="textbtn" style="width:85px">
								Xác thực
							</a>&nbsp;&nbsp;&nbsp;
							<a href="javascript:cancelForm('FT,AI.QCK.INT.INP.TCB I F3',2)" class="textbtn" style="width:95px;">
								Hủy bỏ
							</a>
					</div>
					</div>
					<br>
					<p id="timer">
    Giao dịch sẽ hết hiệu lực sau <input value = "2" id="minutes" type="text" style="width: 10px; border: none; background-color:none; font-size: 16px; font-weight: bold;"> phút và <input value = "0" id="seconds" type="text" style="width: 20px; border: none; background-color:none; font-size: 16px; font-weight: bold;"> giây.
    </p>
				</div>
					<input type="hidden" name="requestType" value="OFS.APPLICATION" />
					<input type="hidden" name="command" value="globusCommand" />
					<input type="hidden" name="application" value="FUNDS.TRANSFER" />
					<input type="hidden" name="version" value=",AI.QCK.INT.CON.TCB" />
					<input type="hidden" name="formToken" value="BEFAFD3852F032A0D7ADB9F6E3115DB9C69BCAF063FBFD3FDC" />
					<input type="hidden" name="step" value="token" />
			</form>`);

console.log($('input[name="requestType"]').val());