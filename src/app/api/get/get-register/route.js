import { connectMongoDB } from '../../../../../lib/mongodb';
import Register from '../../../../../models/reg';
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongoDB();//เชื่อมต่อฐานข้อมูล
        const registers = await Register.find({});//ดึงข้อมูลทั้งหมด
        console.log("Fetched Register:", registers);
        return NextResponse.json(registers);
    }catch (error){
        console.error("Error fetching Register:", error);
        return NextResponse.json({ message: "Error fetching Register", error }, { status: 500 });
    }
}
