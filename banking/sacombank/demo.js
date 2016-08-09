

var abc = 'AuthenticationFG.USER_PRINCIPAL=tunshin&AuthenticationFG.ACCESS_CODE=87d07c5468b280533fb9ecc51451ed37e18c14cb8e712c7cd8df748e66ac798eabe989c9466ce08c74ad438bdbe50c04211d18d39af9be641eea36e1360bb71f11d393390facf5f5c4736ee05c42ab27c95e51fbfe1bd115ea3809f3ff1b38ecbba634718bf7064cba84a103406247d82379563649d8232832f9513a7a3ea765&MIN_LENGTH_OF_PASSWORD=6'

var querystring = require('querystring');

var bao = {
  'AuthenticationFG.USER_PRINCIPA': 'tunshin',
  'AuthenticationFG.ACCESS_CODE': '1ab89c08cb847cab5d43e893f6c3bc70db2fe0818b45c46dafe6185d6e40c57c418314e4f59a635a31a19fdfec13840111935054de83edc74ad42dc3e8152d93be498a17a3127aec6ecba1d9a206c8bc2dc68e92e5fe38b11a184b96800c52c10e58ba8d559b8ff4a9034887fb92d5eae50377f52552159500553d006f844dcc',
  MIN_LENGTH_OF_PASSWORD: '6'
}

console.log(querystring.stringify(bao).length);
console.log(abc.length);
//var b = JSON.parse(a);
//
//console.log(b);