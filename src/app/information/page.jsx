"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// QRCode ต้องใช้ dynamic import ssr: false เท่านั้น
const QRCode = dynamic(() => import("qrcode.react"), { ssr: false });

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
        if (isMounted) setError("ไม่สามารถดึง LINE ID ได้\n\nโปรดเปิดผ่านแอป LINE หรือแจ้งแอดมิน");
      }
      setLoading(false);
    })();
    return () => { isMounted = false; };
  }, [liffId]);

  return { userId, loading, error };
}

export default function InformationPage() {
  const { userId, loading: lineLoading, error: lineError } = useLineUserId("2007571250-Y32QajaJ");
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    if (!userId) return;
    setDataLoading(true);
    setDataError("");
    setUserData(null);

    fetch(`/api/register/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("ไม่พบข้อมูลผู้ใช้ในระบบ");
        return res.json();
      })
      .then(setUserData)
      .catch(err => setDataError(err.message))
      .finally(() => setDataLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">LINE User ID</h2>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-3">
        {/* Loading / Error จาก LIFF */}
        {lineLoading && <div className="text-gray-400 animate-pulse">กำลังโหลด LINE ...</div>}
        {lineError && <div className="text-red-500 text-center whitespace-pre-line">{lineError}</div>}
        
        {/* ดึง LINE ID ได้แล้ว กำลังโหลด userData */}
        {userId && dataLoading && <div className="text-gray-400">ดึงข้อมูลผู้ใช้ ...</div>}
        {userId && dataError && <div className="text-red-500">{dataError}</div>}

        {/* ถ้าได้ข้อมูลแล้ว */}
        {userData && (
          <div className="w-full flex flex-col items-center gap-2">
            <QRCode value={userData.regID || "-"} size={140} />
            <div className="font-bold text-xl text-blue-700">{userData.regName} {userData.regLastname}</div>
            <div className="text-gray-700">เบอร์: {userData.regTel}</div>
            <div className="text-gray-700">หน่วยงาน: {userData.regAgency}</div>
            <div className="text-gray-700">ตำแหน่ง: {userData.regPosition}</div>
            <div className="text-xs text-gray-400 mt-2">ID: {userData.regID}</div>
          </div>
        )}

        {/* ไม่พบข้อมูล */}
        {userId && !dataLoading && !userData && !dataError &&
          <div className="text-gray-500">ไม่พบข้อมูลผู้ใช้</div>
        }
      </div>

      {/* หมายเหตุ UX */}
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
