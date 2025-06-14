"use client";
import React, { useState, useEffect } from "react";
import liff from "@line/liff"; 

function useLineUserId(liffId) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function initLiff() {
      try {
        // INIT แบบ static import
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
        if (isMounted)
          setError(
            "ไม่สามารถดึง LINE ID ได้ ⚠️\n\nโปรดเปิดลิงก์นี้จากแอป LINE บนมือถือเท่านั้น หรือแจ้งแอดมิน"
          );
        console.error("LIFF Error:", err);
      }
      setLoading(false);
    }
    initLiff();
    return () => {
      isMounted = false;
    };
  }, [liffId]);

  return { userId, loading, error };
}

export default function InformationPage() {
  const { userId, loading, error } = useLineUserId("2007571250-Y32QajaJ");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 tracking-wide">
        LINE User ID
      </h2>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-2">
        {loading && (
          <div className="text-gray-400 text-lg animate-pulse">
            (กำลังโหลด ... )
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center text-base whitespace-pre-line">
            {error}
            <div className="text-xs mt-2 text-gray-400">
              <b>หมายเหตุ</b> :<br />
              - เปิดจาก <b>แอป LINE</b> เท่านั้น<br />
              - ถ้ายังไม่ได้ ให้แจ้งแอดมินพร้อมแคปหน้าจอ
            </div>
          </div>
        )}
        {userId && (
          <div className="font-mono text-blue-600 break-all text-lg select-all text-center bg-blue-50 p-4 rounded-xl shadow-inner border border-blue-100">
            {userId}
          </div>
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
