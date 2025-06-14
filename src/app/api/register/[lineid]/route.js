// /api/register/[lineid]/route.js

import { connectMongoDB } from '../../../../../lib/mongodb';
import Register from '../../../../../models/reg';
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const { lineid } = params;
    const user = await Register.findOne({ regLineID: lineid });
    if (!user) return NextResponse.json({ message: "not found" }, { status: 404 });
    return NextResponse.json({
      regID: user.regID,
      regName: user.regName,
      regLastname: user.regLastname,
      regTel: user.regTel,
      regAgency: user.regAgency,
      regPosition: user.regPosition,
    });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}