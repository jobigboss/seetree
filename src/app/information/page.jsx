"use client";
import React, { useState } from "react";
import liff from "@line/liff";

function useLineProfile({ liffId, onProfile }) {
  React.useEffect(() => {
    liff.init({ liffId }).then(async () => {
      if (!liff.isLoggedIn()) liff.login();
      else {
        const profile = await liff.getProfile();
        onProfile(profile);
      }
    });
  }, []);
}

function InformationPage() {
  const [userId, setUserId] = useState("");

  useLineProfile({
    liffId: "2007571250-qDke3G3J", // ใส่ LIFF ID ของคุณ
    onProfile: (profile) => {
      setUserId(profile.userId); // ได้ userId ที่นี่
      // console.log(profile); // จะดูข้อมูลอื่นก็ได้
    }
  });

  return (
    <div className="p-8 text-center">
      <div className="mb-2 font-bold">LINE User ID</div>
      <div className="font-mono bg-gray-100 px-4 py-2 rounded">{userId || "(กำลังโหลด...)"}</div>
    </div>
  );
}

export default InformationPage;
