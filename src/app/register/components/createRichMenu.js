const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';

const richMenuBody = {
  size: { width: 2500, height: 843 },
  selected: true,
  name: "Register",
  chatBarText: "ลงทะเบียนเข้างาน",
  areas: [
    {
      bounds: { x: 0, y: 0, width: 2500, height: 843 },
      action: {
        type: "uri",
        uri: "https://liff.line.me/2007571250-qDke3G3J", // เปลี่ยนเป็นลิงก์ฟอร์มลงทะเบียนของคุณ
      },
    },
  ],
};

axios.post(
  "https://api.line.me/v2/bot/richmenu",
  richMenuBody,
  {
    headers: {
      "Authorization": `Bearer ${channelAccessToken}`,
      "Content-Type": "application/json",
    },
  }
)
.then(res => {
  console.log('RichMenu created:', res.data); // <<-- ตรงนี้จะบอก richMenuId กลับมา
})
.catch(err => {
  console.error('Error:', err.response?.data || err.message);
});


