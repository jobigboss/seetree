const axios = require('axios');
const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';
const richMenuId = 'richmenu-9e2ef7471e5fab457460e7f94a0c995c';

axios.post(
  `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
  {},
  { headers: { Authorization: `Bearer ${channelAccessToken}` } }
).then(res => console.log('✅ RichMenu set as default!'));
