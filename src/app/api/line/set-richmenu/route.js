// src/app/api/line/set-richmenu/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, richMenuId } = await req.json();

  // LINE Channel Access Token (ต้องตั้งเป็น env จริงจัง!)
  const accessToken = process.env.LINE_ACCESS_TOKEN;

  const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });
    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const err = await res.text();
      return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
