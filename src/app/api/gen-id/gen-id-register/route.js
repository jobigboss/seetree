//api/gen-id/gen-id-register
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Register from "../../../../../models/reg";
import { connectMongoDB } from "../../../../../lib/mongodb";

export async function GET() {
  try {
    await connectMongoDB();
    const now = new Date();
    const thaiDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const yy = thaiDate.getFullYear().toString().slice(-2);
    const mm = String(thaiDate.getMonth() + 1).padStart(2, "0");
    const dd = String(thaiDate.getDate()).padStart(2, "0");
    const datePrefix = `${yy}${mm}${dd}`;
    const regex = new RegExp(`^STR${datePrefix}`);
    const todayCount = await Register.countDocuments({ regID: { $regex: regex } });
    const runningNumber = String(todayCount + 1).padStart(3, "0");
    const generatedID = `STR${datePrefix}${runningNumber}`;
    return NextResponse.json({ id: generatedID });
  } catch (error) {
    console.error("❌ Failed to generate ID:", error);
    return NextResponse.json({ error: "Failed to generate ID" }, { status: 500 });
  }
}