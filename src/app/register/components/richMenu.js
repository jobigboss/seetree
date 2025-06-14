require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

// --- CONFIG ---
const channelAccessToken = process.env.LINE_ACCESS_TOKEN;
const MONGO_URI = process.env.MONGODB_URI;

// --- RichMenu IDs ---
const REGISTER_MENU_ID = 'richmenu-9e2ef7471e5fab457460e7f94a0c995c'; // ยังไม่สมัคร
const MEMBER_MENU_ID   = 'richmenu-370037ea591efaf5a7d4af363333dacf'; // สมัครแล้ว

// --- Mongoose Model ---
const userSchema = new mongoose.Schema({
  regLineID: String,
  // ...field อื่นๆ
});
const User = mongoose.model('User', userSchema, 'users');

// --- Set RichMenu Function ---
async function setRichMenu(userId, isRegistered) {
  const richMenuId = isRegistered ? MEMBER_MENU_ID : REGISTER_MENU_ID;
  await axios.post(
    `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
    {},
    { headers: { Authorization: `Bearer ${channelAccessToken}` } }
  );
}

// --- Main ---
async function run(userId) {
  await mongoose.connect(MONGO_URI);
  // เช็กว่า user นี้มีใน DB มั้ย
  const user = await User.findOne({ regLineID: userId });
  const isRegistered = !!user;
  await setRichMenu(userId, isRegistered);
  console.log('✅ Rich menu updated!', isRegistered ? '(Member)' : '(Register)');
  await mongoose.disconnect();
}

// --- ใส่ userId ที่ต้องการ (LINE User ID) ---
run('U431ff07a6db95f869788a0a835b0cfe6')
  .catch(err => console.error('❌ Error:', err.response?.data || err.message));
