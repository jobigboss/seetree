"use client";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

function useLineUserId(liffId) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const liff = (await import("@line/liff")).default;
        if (!liff.isInitialized) await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        if (isMounted) setUserId(profile.userId);
      } catch (err) {
        if (isMounted) setError("LIFF Error: " + (err?.message || String(err)));
      }
      setLoading(false);
    })();
    return () => { isMounted = false; };
  }, [liffId]);
  return { userId, loading, error };
}

export default function InformationPage() {
  const { userId, loading, error } = useLineUserId("2007571250-Y32QajaJ");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/register/${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setUserData(data));
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">LINE User ID</h2>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-3">
        {loading && <div className="text-gray-400 text-lg animate-pulse">(กำลังโหลด LINE ...)</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {userData && userData.regID && (
          <div className="w-full flex flex-col items-center gap-2">
            <QRCode value={userData.regID} size={140} />
            <div className="font-bold text-xl text-blue-700">
              {userData.regName} {userData.regLastname}
            </div>
            <div className="text-gray-700">เบอร์โทร: {userData.regTel}</div>
            <div className="text-gray-700">หน่วยงาน: {userData.regAgency}</div>
            <div className="text-gray-700">ตำแหน่ง: {userData.regPosition}</div>
            <div className="text-xs text-gray-400 mt-2">ID: {userData.regID}</div>
          </div>
        )}
        {userId && !userData && !loading &&
          <div className="text-gray-500 text-center">ไม่พบข้อมูลผู้ใช้</div>
        }
      </div>
    </div>
  );
}
