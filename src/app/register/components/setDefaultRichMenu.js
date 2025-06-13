const axios = require('axios');
const channelAccessToken = 'cH2s8JQDcmOLJqUZ8T6cV07Jlp0AlCXi3ynTGw3hbBfSS/hHP3plTxVUjCS6E6k+3LY/nwWuNYAQ0obAgHq6MLfT1FL2mGSgoiFtM0SQIEydUeddqct5wtMndf5tsYl2qyf2HGBUvxO1zB6lPeYBJgdB04t89/1O/w1cDnyilFU=';
const richMenuId = 'richmenu-22d4adf492788dcf65750089c0b4261f';

axios.post(
  `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
  {},
  { headers: { Authorization: `Bearer ${channelAccessToken}` } }
).then(res => {
  console.log('✅ Set default RichMenu success:', res.data);
}).catch(err => {
  console.error('❌ Error:', err.response?.data || err.message);
});
