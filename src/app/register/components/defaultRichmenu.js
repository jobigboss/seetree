
const fs = require('fs');
const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU='; // Token เดิม
const richMenuId = 'richmenu-569c61b59b2603bd9aaa49a124d060f5'; // richMenuId ของคุณ
const imagePath = './public/logo.png'; // ถ้าอยู่ใน webapp/public/logo.png

axios.post(
  `https://api.line.me/v2/bot/richmenu/${richMenuId}/content`,
  fs.createReadStream(imagePath),
  {
    headers: {
      "Authorization": `Bearer ${channelAccessToken}`,
      "Content-Type": "image/png"
    }
  }
)
.then(res => {
  console.log('อัปโหลดรูป RichMenu สำเร็จ', res.data);
})
.catch(err => {
  console.error('Error:', err.response?.data || err.message);
});
