const fs = require('fs');
const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU='; // ใส่ตัวใหม่ที่เพิ่งใช้ได้จริง
const richMenuId = 'richmenu-370037ea591efaf5a7d4af363333dacf';
const imagePath = './public/richmenu_1749867562041.png'; // path รูป png ที่ถูกต้อง

const imageBuffer = fs.readFileSync(imagePath);

axios.post(
  `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
  imageBuffer,
  {
    headers: {
      'Authorization': `Bearer ${channelAccessToken}`,
      'Content-Type': 'image/png',
    },
  }
)
.then(res => {
  console.log('✅ RichMenu image uploaded!');
})
.catch(err => {
  console.error('❌ Upload error:', err.response?.data || err.message);
});
