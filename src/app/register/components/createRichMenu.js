const axios = require('axios');

const channelAccessToken = 'r/qR6Ol1PjJ4pMqQt943qLHEpD3VbjjnLuComPyj4KcteaeLOcEFxMT0cZhUiT7i3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEybA7p3K0vnJF1dRTFyFig5pxORlTaZYSiCS5h66jzQ5wdB04t89/1O/w1cDnyilFU=';

// const richMenuBody = {
//   size: { width: 2500, height: 843 },
//   selected: true,
//   name: "Register",
//   chatBarText: "ลงทะเบียนเข้างาน",
//   areas: [
//     {
//       bounds: { x: 0, y: 0, width: 2500, height: 843 },
//       action: {
//         type: "uri",
//         uri: "https://liff.line.me/2007571250-qDke3G3J", // เปลี่ยนเป็นลิงก์ฟอร์มลงทะเบียนของคุณ
//       },
//     },
//   ],
// };

const richMenuBody = {
  size: { width: 2500, height: 843 },
  selected: false,
  name: "Member",
  chatBarText: "เมนูสมาชิก",
  areas: [
    // ปุ่มที่ 1 (ซ้าย)
    {
      bounds: { x: 0, y: 0, width: 833, height: 843 },
      action: {
        type: "uri",
        uri: "https://liff.line.me/2007571250-Y32QajaJ",
        // หรือ type: "message", text: "ปุ่มที่ 1"
      },
    },
    // ปุ่มที่ 2 (กลาง)
    {
      bounds: { x: 834, y: 0, width: 833, height: 843 },
      action: {
        type: "uri",
        uri: "https://your-link-2.com",
        // หรือ type: "message", text: "ปุ่มที่ 2"
      },
    },
    // ปุ่มที่ 3 (ขวา)
    {
      bounds: { x: 1667, y: 0, width: 833, height: 843 },
      action: {
        type: "uri",
        uri: "https://your-link-3.com",
        // หรือ type: "message", text: "ปุ่มที่ 3"
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


