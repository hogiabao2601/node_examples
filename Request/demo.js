'use strict';

/**
 * Created by baohg on 07/06/2016.
 */
var request = require('request');
var fs=  require('fs');

var payload = '7|2|79|https://ebanking.dongabank.com.vn/khcn/resources/main/|19AEEF13C9F82838A4D27231DCD523E1|com.dtsc.gwt.client.core.client.data.RpcTokenDtsc/1025630141|FUNCTION_EBANK_INTERNET_TRANSFER_IN|SCREEN_EBANK_INTERNET_TRANSFER|B04131214C45A2852B5C194133C12E61|com.dtsc.ebankinternet.share.main.shared.service.TransferRpcCommandService|initTransfer|com.dtsc.ebankinternet.share.common.shared.dto.data.ModelDTO/2552875158|com.dtsc.gwt.client.core.client.data.RpcMap/3585405248|customerList|java.util.ArrayList/4159755760|defaultAccountList|newBillData|newCustData|newParamsInput|attributeList|java.util.HashMap/1797211028|amount|java.lang.Long/4227064769|description|java.lang.String/2004016611|dasdsadsad|fee|payerAccount|accountTypeName|Tài khoản thẻ nội địa|accountBlockAmount|customerNo|580617|balanceAvailable|cardNo|9704060733941292|balance|customerId|accountCCY|VND|accountStatus|O|systemId|java.lang.Integer/3438268394|englishCustomerName|PHAM HO CONG TRUNG|customerTypeCode|CT-00|balanceAvailableCCY|java.lang.Double/858496421|customerName|PHA\u0323M HÔ\u0300 CÔNG TRUNG|customerType|accountStatusCode|N|systemCode|CS-01|limitOverDraft|altAccountNo|0101580617|odRate|zoneId|02|accountName|accountStatusDescription|TK ĐANG KÍCH HOẠT|customerAddress|44/21 Vo\u0303 Văn Kiê\u0323t Q1|accountType|01|account|longCustomerId|balanceCCY|receiveAccount|0103150444|serviceCode|ST-02|transferLater|java.lang.Boolean/476441737|productCode|EP-005|multiAuthen|1|2|3|4|5|6|7|8|2|9|9|9|1|10|13|11|12|0|13|12|0|14|12|0|15|12|0|16|12|0|17|18|0|19|20|MNQ|21|22|23|24|20|A|25|9|1|10|32|26|22|27|28|-12|29|22|30|31|20|UCJ|32|22|33|34|20|UCJ|35|20|dqw|15|12|0|17|18|0|36|22|37|38|22|39|40|41|2|42|22|43|44|22|45|11|12|0|46|47|82057|48|22|49|50|20|C|51|22|52|53|22|54|55|-12|56|22|57|58|47|0|59|22|60|61|-30|13|12|0|62|22|63|64|22|65|66|22|67|68|-34|69|20|dqw|70|47|82057|71|22|72|73|22|74|75|76|0|9|1|10|8|11|12|0|13|12|0|14|12|0|15|12|0|16|12|0|17|18|0|77|22|78|79|-45|';


var parm = {
  url: 'https://ebanking.dongabank.com.vn/khcn/resources/main/transferRpcCommandService',
  headers: {
    'X-GWT-Permutation':'40C4A672ECEE84A4E02AB4D31AC22092',
    'X-GWT-Module-Base':'https://ebanking.dongabank.com.vn/khcn/resources/main/',
    'Cookie': 'JSESSIONID=E01E4624B573F78101E460196558F03F.khcn-ins3',
    'Content-Type':'text/x-gwt-rpc; charset=UTF-8',
  },
  body: payload
}
request.post(parm, (error, res, body) => {
  if(error){

  }else{
    console.log(res.statusCode);
    console.log(res.headers);
    fs.writeFile('bcdf.html', res.body)
  }
});