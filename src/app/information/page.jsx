"use client";
import React, { useState } from "react";
import QRCode from "qrcode.react"; // ถ้าใช้ Next.js 13+ ให้ npm i qrcode.react

function InformationPage() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/register/${userId}`);
      if (!res.ok) throw new Error("ไม่พบข้อมูล");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      alert("ไม่พบข้อมูล userId นี้");
      setUserData(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="mb-6 flex gap-2">
        <input
          className="border rounded-lg px-4 py-2"
          placeholder="กรอก userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleFetch}
          disabled={loading || !userId}
        >
          {loading ? "กำลังโหลด..." : "แสดงข้อมูล"}
        </button>
      </div>
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
    </div>
  );
}

export default InformationPage;
