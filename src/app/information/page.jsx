"use client";
import React, { useState } from "react";
import liff from "@line/liff";

function useLineProfile({ liffId, onProfile }) {
  React.useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId });
        console.log("LIFF init success");
        if (!liff.isLoggedIn()) {
          console.log("Not logged in, redirecting to login...");
          liff.login();
        } else {
          const profile = await liff.getProfile();
          console.log("LIFF Profile:", profile);
          onProfile(profile);
        }
      } catch (err) {
        console.error("LIFF error:", err);
      }
    })();
  }, []);
}

function InformationPage() {
  const [userId, setUserId] = useState("");
  useLineProfile({
    liffId: "2007571250-qDke3G3J",
    onProfile: (profile) => setUserId(profile.userId)
  });
  return (
    <div className="p-8 text-center">
      <div className="mb-2 font-bold">LINE User ID</div>
      <div className="font-mono bg-gray-100 px-4 py-2 rounded">
        {userId || "(กำลังโหลด...)"}
      </div>
    </div>
  );
}

export default InformationPage;
