"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import liff from "@line/liff"; // npm i @line/liff

function InformationPage() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ดึง LINE userId ทันทีที่เข้าเพจ
useEffect(() => {
  liff.init({ liffId: "2007571250-qDke3G3J" }).then(async () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      const profile = await liff.getProfile();
      console.log('LIFF userId =', profile.userId); // <<-- ใส่ log นี้
      setUserId(profile.userId);
      fetchUserData(profile.userId);
    }
  });
}, []);


  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก API
  const fetchUserData = async (uid) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/register/${uid}`);
      if (!res.ok) throw new Error("ไม่พบข้อมูล");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setUserData(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="mb-6">
        <input
          className="border rounded-lg px-4 py-2"
          value={userId}
          readOnly
          placeholder="LINE UserId"
        />
      </div>
      {loading && <div className="mb-4">กำลังโหลด...</div>}
      {userData && (
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center gap-4">
          <QRCode value={userData.regID || "NO-ID"} size={120} className="mb-3" />
          <div className="text-xl font-bold text-blue-700">
            {userData.regName} {userData.regLastname}
          </div>
          <div className="text-gray-700">เบอร์โทร: {userData.regTel}</div>
          <div className="text-gray-700">หน่วยงาน: {userData.regAgency}</div>
          <div className="text-gray-700">ตำแหน่ง: {userData.regPosition}</div>
          <div className="text-xs text-gray-400 mt-2">ID: {userData.regID}</div>
        </div>
      )}
      {!loading && !userData && (
        <div className="text-gray-500 mt-4">ไม่พบข้อมูลสำหรับ LINE ID นี้</div>
      )}
    </div>
  );
}

export default InformationPage;
