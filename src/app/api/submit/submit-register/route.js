//api/submit/submit-regoster/route.js
import { connectMongoDB } from '../../../../../lib/mongodb';
import Register from '../../../../../models/reg';
import { NextResponse } from "next/server";
import { setRichMenuToUser } from "../../../../../lib/lineRichMenu";

export async function POST(request) {
  try {
    // เชื่อม MongoDB
    await connectMongoDB();

    // รับข้อมูลจาก body (JSON)
    const body = await request.json();

    // ตรวจสอบว่าข้อมูลจำเป็นครบไหม
    const {regID,regLineID,regName, regLastname, regTel, regAgency, regPosition } = body;
    if (!regID || !regName || !regLastname || !regTel || !regAgency || !regPosition) {
      return NextResponse.json(
        { success: false, message: "ข้อมูลไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    // สร้างข้อมูลใหม่
    const reg = await Register.create({
      regID,
      regLineID,
      regName,
      regLastname,
      regTel,
      regAgency,
      regPosition,
      // เพิ่ม field เพิ่มเติมถ้าต้องการ
    });

        // 3. เปลี่ยน Rich Menu สำหรับ user คนนี้
    const richMenuId = "RICH_MENU_ID_FOR_MEMBER"; // แก้เป็น RichMenuId ที่สร้างไว้
    if (regLineID) {
      await setRichMenuToUser(regLineID, richMenuId);
    }
    // ส่งกลับ OK
    return NextResponse.json({ success: true, reg }, { status: 201 });
  } catch (err) {
    console.error("❌ Register Error:", err);
    return NextResponse.json(
      { success: false, message: "บันทึกข้อมูลไม่สำเร็จ", error: err.message },
      { status: 500 }
    );
  }
}