// ลบ richmenu ที่ไม่ได้ใช้
const axios = require('axios');
const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';
axios.get('https://api.line.me/v2/bot/richmenu/list', {
  headers: { 'Authorization': `Bearer ${channelAccessToken}` }
}).then(res => {
  res.data.richmenus.forEach(r => {
    axios.delete(`https://api.line.me/v2/bot/richmenu/${r.richMenuId}`, {
      headers: { 'Authorization': `Bearer ${channelAccessToken}` }
    }).then(() => console.log('deleted', r.richMenuId));
  });
});
