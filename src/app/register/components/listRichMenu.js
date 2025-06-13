// src/app/register/components/listRichMenu.js
const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';

axios.get('https://api.line.me/v2/bot/richmenu/list', {
  headers: {
    'Authorization': `Bearer ${channelAccessToken}`
  }
})
.then(res => {
  console.log('RichMenu List:', JSON.stringify(res.data, null, 2));
})
.catch(err => {
  console.error('❌ Error:', err.response?.data || err.message);
});
