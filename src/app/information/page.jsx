"use client";
import React, { useState, useEffect } from "react";

// Custom Hook: ใช้ dynamic import กับ liff
function useLineUserId(liffId) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function initLiff() {
      try {
        const liff = (await import("@line/liff")).default;
        if (!liff.isInitialized) {
          await liff.init({ liffId });
        }
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        if (isMounted) setUserId(profile.userId);
      } catch (err) {
        if (isMounted) setError("ไม่สามารถดึง LINE ID ได้ กรุณาเปิดผ่านแอป LINE หรือแจ้งแอดมิน");
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
  const { userId, loading, error } = useLineUserId("2007571250-qDke3G3J");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 tracking-wide">LINE User ID</h2>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-2">
        {loading && <div className="text-gray-400 text-lg animate-pulse">(กำลังโหลด ...)</div>}
        {error && (
          <div className="text-red-500 text-center text-base">
            {error}
            <div className="text-xs mt-2 text-gray-400">
              - เปิดจาก <b>แอป LINE</b> เท่านั้น<br />
              - ถ้ายังไม่ได้ ให้แจ้งแอดมินพร้อมแคปหน้าจอ
            </div>
          </div>
        )}
        {userId && (
          <div className="font-mono text-blue-600 break-all text-lg select-all text-center bg-gray-100 p-3 rounded-xl shadow-inner border border-blue-100">
            {userId}
          </div>
        )}
      </div>
    </div>
  );
}
