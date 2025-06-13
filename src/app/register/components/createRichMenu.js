const axios = require('axios');

const channelAccessToken = 'cH2s8JQDcmOLJqUZ8T6cV07Jlp0AlCXi3ynTGw3hbBfSS/hHP3plTxVUjCS6E6k+3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEydUeddqct5wtMndf5tsYl2qyf2HGBUvxO1zB6lPeYBJgdB04t89/1O/w1cDnyilFU=';

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


