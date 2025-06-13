const axios = require('axios');
const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';
const richMenuId = 'richmenu-998c1dcae6ec0c75ee2f30c26f9a9b8a';

axios.post(
  `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
  {},
  { headers: { Authorization: `Bearer ${channelAccessToken}` } }
).then(res => {
  console.log('✅ Set default RichMenu success:', res.data);
}).catch(err => {
  console.error('❌ Error:', err.response?.data || err.message);
});
