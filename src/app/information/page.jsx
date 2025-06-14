"use client";
import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import QRCode from "qrcode.react"; // yarn add qrcode.react

function useLineUserId(liffId) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function initLiff() {
      try {
        if (!liff.isInitialized) await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        if (isMounted) setUserId(profile.userId);
      } catch (err) {
        if (isMounted)
          setError("ไม่สามารถดึง LINE ID ได้ ⚠️\n\nโปรดเปิดผ่านแอป LINE เท่านั้น หรือแจ้งแอดมิน");
        console.error("LIFF Error:", err);
      }
      setLoading(false);
    }
    initLiff();
    return () => { isMounted = false; };
  }, [liffId]);

  return { userId, loading, error };
}

export default function InformationPage() {
  const { userId, loading, error } = useLineUserId("2007571250-Y32QajaJ");
  const [userData, setUserData] = useState(null);
  const [dataError, setDataError] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  // เมื่อได้ userId ให้ fetch ข้อมูล user
  useEffect(() => {
    if (!userId) return;
    setDataLoading(true);
    fetch(`/api/register/${userId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("ไม่พบข้อมูลผู้ใช้");
        return await res.json();
      })
      .then(data => setUserData(data))
      .catch(err => setDataError(err.message))
      .finally(() => setDataLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 tracking-wide">LINE User ID</h2>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-3">
        {/* Show Loading/Error for LIFF */}
        {loading && <div className="text-gray-400 text-lg animate-pulse">(กำลังโหลด LINE ...)</div>}
        {error && (
          <div className="text-red-500 text-center text-base whitespace-pre-line">{error}</div>
        )}

        {/* Show Data Fetch Loading/Error */}
        {userId && dataLoading && <div className="text-gray-400">(ดึงข้อมูลผู้ใช้ ...)</div>}
        {dataError && (
          <div className="text-red-500 text-center text-base">{dataError}</div>
        )}

        {/* Show User Info and QRCode */}
        {userData && (
          <div className="w-full flex flex-col items-center gap-2">
            <QRCode value={userData.regID || "NO-ID"} size={140} className="mb-2" />
            <div className="font-bold text-xl text-blue-700">
              {userData.regName} {userData.regLastname}
            </div>
            <div className="text-gray-700">เบอร์โทร: {userData.regTel}</div>
            <div className="text-gray-700">หน่วยงาน: {userData.regAgency}</div>
            <div className="text-gray-700">ตำแหน่ง: {userData.regPosition}</div>
            <div className="text-xs text-gray-400 mt-2">ID: {userData.regID}</div>
          </div>
        )}

        {/* Fallback: No user found */}
        {userId && !dataLoading && !userData && !dataError && (
          <div className="text-gray-500 text-center">ไม่พบข้อมูลผู้ใช้</div>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-400 text-center px-4">
        <span className="hidden sm:inline">
          ⚡ หากไม่ได้ userId โปรดกลับไปเปิดผ่านแอป LINE (กดลิงก์จากในแชท) เท่านั้น
        </span>
        <span className="inline sm:hidden">
          ⚡ ต้องเปิดจากแอป LINE เท่านั้น หากยังไม่ได้ ให้ลองปิดแอปแล้วเปิดใหม่อีกครั้ง
        </span>
      </div>
    </div>
  );
}
