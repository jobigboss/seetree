// src/app/api/register/[userId]/route.js
import { connectMongoDB } from '../../../../../lib/mongodb'
import Register from '../../../../../models/reg'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  await connectMongoDB();
  const { userId } = params;
  console.log("[API] GET /api/register/[userId]", { userId }); // เพิ่ม log
  const user = await Register.findOne({ regLineID: userId });
  console.log("[API] User found:", user); // เพิ่ม log
  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
