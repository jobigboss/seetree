"use client"
import React, { useState } from "react";
import { useLineProfile } from "./useLineProfile"; // <== import จากไฟล์ข้างบนหรือวางบนไฟล์เดียวกัน

function InformationPage() {
  const [userId, setUserId] = useState("");

  // ดึง userId แบบ real time
  useLineProfile({
    liffId: "2007571250-qDke3G3J", // << ใส่ LIFF ID ที่สร้างใน LINE Developers
    onProfile: (profile) => {
      setUserId(profile.userId); // ได้ userId ที่นี่
      console.log("userId =", profile.userId); // log ดูได้เลย
      // สามารถนำไป fetch API ต่อได้เลย
    },
  });

  return (
    <div className="p-6">
      <div className="mb-2">LINE User ID:</div>
      <div className="font-mono text-blue-600">{userId || "(กำลังโหลด...)"}</div>
    </div>
  );
}

export default InformationPage;
