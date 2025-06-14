"use client";
import React, { useState, useEffect } from "react";

// Custom hook สำหรับดึง LINE Profile
function useLineUserId(liffId) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    let isMounted = true;
    async function initLiff() {
      try {
        // Dynamic import เพื่อป้องกัน SSR error
        const liff = (await import("@line/liff")).default;
        if (!liff.isInitialized) {
          await liff.init({ liffId });
        }
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        if (isMounted) {
          setUserId(profile.userId);
        }
      } catch (err) {
        setError("ไม่สามารถดึง LINE ID ได้");
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
  const { userId, loading, error } = useLineUserId("2007571250-qDke3G3J");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">LINE User ID</h2>
      <div className="w-full max-w-xs bg-white rounded-xl shadow p-6 flex flex-col items-center">
        {loading && <div className="text-gray-400">(กำลังโหลด ...)</div>}
        {error && <div className="text-red-500">{error}</div>}
        {userId && (
          <div className="font-mono text-blue-700 break-all text-lg">{userId}</div>
        )}
      </div>
    </div>
  );
}
