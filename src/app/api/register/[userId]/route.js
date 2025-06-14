// src/app/api/register/[userId]/route.js
import { connectMongoDB } from '../../../../../lib/mongodb'
import Register from '../../../../../models/reg'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  await connectMongoDB();
  const { userId } = params;
  const user = await Register.findOne({ regLineID: userId });
  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
