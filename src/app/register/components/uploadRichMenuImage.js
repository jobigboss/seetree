const fs = require('fs');
const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';
const richMenuId = 'richmenu-9e2ef7471e5fab457460e7f94a0c995c';
const imagePath = '../../../../public/richmenu_1749849024096.png';  // <<-- แก้ path ให้ตรงกับไฟล์จริง

if (!fs.existsSync(imagePath)) {
  console.error('❌ ไม่พบไฟล์:', imagePath);
  process.exit(1);
}

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
  console.log('✅ อัปโหลดรูป RichMenu สำเร็จ', res.data);
})
.catch(err => {
  // Print รายละเอียด error
  console.error('❌ Upload error:', err.response?.data || err.message);
});
