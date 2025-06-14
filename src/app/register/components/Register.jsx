"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaPhone, FaBuilding, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import NeonLoading from "./NeonLoading";
import liff from '@line/liff';


function useLineProfile({ liffId, onProfile }) {
  useEffect(() => {
    liff.init({ liffId }).then(async () => {
      if (!liff.isLoggedIn()) liff.login();
      else {
        const profile = await liff.getProfile();
        onProfile(profile);
      }
    });
  }, []);
}

const agencyOptions = ["ฝ่ายการตลาด", "ฝ่ายสื่อสารองค์กร", "ทีมอีเวนต์", "อื่นๆ"];
const positionOptions = ["Staff", "Supervisor", "Team Leader", "MC", "Promoter"];

function RegisterPage() {
  const [form, setForm] = useState({
    regName: "",
    regLastname: "",
    regTel: "",
    regAgency: "",
    regPosition: "",
  });
  const [touched, setTouched] = useState({});
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const formRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [lineProfile, setLineProfile] = useState(null);

  useLineProfile({
  liffId: "2007571250-qDke3G3J", // ต้องไปสร้างใน LINE Developer Console
  onProfile: setLineProfile
});

  // Focus ช่องแรก
  React.useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y, active: true });
  };
  const handleMouseLeave = () => setMouse((m) => ({ ...m, active: false }));

  // Validate
  const isName = form.regName.trim().length > 0;
  const isLastname = form.regLastname.trim().length > 0;
  const isTel = /^\d{10}$/.test(form.regTel);
  const isAgency = !!form.regAgency;
  const isPosition = !!form.regPosition;
  const isComplete = isName && isLastname && isTel && isAgency && isPosition;

  // Progress count
  const progressCount = [isName, isLastname, isTel, isAgency, isPosition].filter(Boolean).length;

  // Change + touched
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

      // Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isComplete) return;
  setLoading(true);
  try {
    // 1. ขอรหัสก่อน
    const resId = await fetch("/api/gen-id/gen-id-register");
    const { id } = await resId.json();

    // 2. POST ฟอร์ม + regID
    await fetch("/api/submit/submit-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, regID: id, regLineID: lineProfile?.userId }),
    });

    // 3. เรียกเปลี่ยน RichMenu (trigger API อัตโนมัติ)
    await fetch("/api/line/set-richmenu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: lineProfile?.userId }),
    });


    // loading + reset
    setTimeout(() => {
      setLoading(false);
      liff.closeWindow();
      setForm({ regName: "", regLastname: "", regTel: "", regAgency: "", regPosition: "" });
      setTouched({});
      nameRef.current?.focus();
    }, 5000);
  } catch (err) {
    setLoading(false);
  }
};


  // Neon Mouse BG style
  const glowStyle = mouse.active
    ? {
        background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, #00eaff66 0%, #7d5fff33 60%, transparent 100%)`,
        transition: "background 0.2s",
      }
    : {
        background: "radial-gradient(320px circle at 50% 0px, #00eaff22 0%, #7d5fff11 80%, transparent 100%)",
        transition: "background 0.4s",
      };

       if (loading) return <NeonLoading text="กำลังบันทึกข้อมูล..." />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181924]">
      <form
        ref={formRef}
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-[#10101a] rounded-2xl border border-[#3926b0] shadow-[0_0_36px_4px_#7d5fff55] backdrop-blur-xl p-7 flex flex-col gap-5 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onSubmit={handleSubmit}
        style={glowStyle}
        autoComplete="off"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-center neon-flicker tracking-tight mb-4 select-none text-white">
          ลงทะเบียน <span className="text-[#7d5fff]">EVENT</span>
        </h2>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="regName" className="sr-only">ชื่อ</label>
          <div className="flex items-center gap-2">
            <FaUser className="text-[#37a0ff] text-lg" />
            <input
              ref={nameRef}
              id="regName"
              aria-label="ชื่อ"
              className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
                touched.regName && !isName
                  ? "border-red-500"
                  : form.regName
                  ? "border-[#37a0ff] shadow-[0_0_8px_#37a0ff66]"
                  : "border-[#232337]"
              } text-white placeholder:text-[#7d5fff99] focus:outline-none focus:ring-2 focus:ring-[#37a0ff] transition`}
              value={form.regName}
              onChange={(e) => handleChange("regName", e.target.value)}
              placeholder="ชื่อ"
              required
              autoComplete="off"
              onBlur={() => setTouched((p) => ({ ...p, regName: true }))}
            />
          </div>
          {touched.regName && !isName && (
            <span className="text-xs text-red-400 ml-7">กรุณากรอกชื่อ</span>
          )}
        </div>
        {/* Lastname */}
        <div className="flex flex-col gap-1">
          <label htmlFor="regLastname" className="sr-only">นามสกุล</label>
          <div className="flex items-center gap-2">
            <FaUser className="text-[#f84fff] text-lg" />
            <input
              id="regLastname"
              aria-label="นามสกุล"
              className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
                touched.regLastname && !isLastname
                  ? "border-red-500"
                  : form.regLastname
                  ? "border-[#f84fff] shadow-[0_0_8px_#f84fff66]"
                  : "border-[#232337]"
              } text-white placeholder:text-[#f84fff99] focus:outline-none focus:ring-2 focus:ring-[#f84fff] transition`}
              value={form.regLastname}
              onChange={(e) => handleChange("regLastname", e.target.value)}
              placeholder="นามสกุล"
              required
              autoComplete="off"
              onBlur={() => setTouched((p) => ({ ...p, regLastname: true }))}
            />
          </div>
          {touched.regLastname && !isLastname && (
            <span className="text-xs text-red-400 ml-7">กรุณากรอกนามสกุล</span>
          )}
        </div>
        {/* Tel */}
        <div className="flex flex-col gap-1">
          <label htmlFor="regTel" className="sr-only">เบอร์โทรศัพท์</label>
          <div className="flex items-center gap-2">
            <FaPhone className="text-[#7d5fff] text-lg" />
            <input
              id="regTel"
              aria-label="เบอร์โทรศัพท์"
              className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
                touched.regTel && !isTel
                  ? "border-red-500"
                  : form.regTel.length === 10
                  ? "border-[#7d5fff] shadow-[0_0_8px_#7d5fff66]"
                  : "border-[#232337]"
              } text-white placeholder:text-[#7d5fff99] focus:outline-none focus:ring-2 focus:ring-[#7d5fff] transition`}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={form.regTel}
              onChange={(e) => handleChange("regTel", e.target.value.replace(/\D/g, ""))}
              placeholder="เบอร์ 10 หลัก"
              required
              autoComplete="off"
              onBlur={() => setTouched((p) => ({ ...p, regTel: true }))}
            />
          </div>
          {touched.regTel && !isTel && (
            <span className="text-xs text-red-400 ml-7">กรุณากรอกเบอร์ 10 หลัก</span>
          )}
        </div>
        {/* Agency */}
        <div className="flex flex-col gap-1">
          <label htmlFor="regAgency" className="sr-only">สังกัด</label>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-[#37a0ff] text-lg" />
            <select
              id="regAgency"
              aria-label="สังกัด"
              className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
                touched.regAgency && !isAgency
                  ? "border-red-500"
                  : form.regAgency
                  ? "border-[#37a0ff] shadow-[0_0_8px_#37a0ff66]"
                  : "border-[#232337]"
              } text-white focus:outline-none focus:ring-2 focus:ring-[#37a0ff] transition`}
              value={form.regAgency}
              onChange={(e) => handleChange("regAgency", e.target.value)}
              required
              onBlur={() => setTouched((p) => ({ ...p, regAgency: true }))}
            >
              <option value="">เลือกสังกัด</option>
              {agencyOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          {touched.regAgency && !isAgency && (
            <span className="text-xs text-red-400 ml-7">กรุณาเลือกสังกัด</span>
          )}
        </div>
        {/* Position */}
        <div className="flex flex-col gap-1">
          <label htmlFor="regPosition" className="sr-only">ตำแหน่ง</label>
          <div className="flex items-center gap-2">
            <FaUserTie className="text-[#f84fff] text-lg" />
            <select
              id="regPosition"
              aria-label="ตำแหน่ง"
              className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
                touched.regPosition && !isPosition
                  ? "border-red-500"
                  : form.regPosition
                  ? "border-[#f84fff] shadow-[0_0_8px_#f84fff66]"
                  : "border-[#232337]"
              } text-white focus:outline-none focus:ring-2 focus:ring-[#f84fff] transition`}
              value={form.regPosition}
              onChange={(e) => handleChange("regPosition", e.target.value)}
              required
              onBlur={() => setTouched((p) => ({ ...p, regPosition: true }))}
            >
              <option value="">เลือกตำแหน่ง</option>
              {positionOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          {touched.regPosition && !isPosition && (
            <span className="text-xs text-red-400 ml-7">กรุณาเลือกตำแหน่ง</span>
          )}
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#232337] overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7d5fff] via-[#37a0ff] to-[#f84fff] transition-all duration-700"
            style={{
              width: `${(progressCount / 5) * 100}%`,
              filter: isComplete ? "drop-shadow(0 0 16px #f84fff99)" : "",
              opacity: progressCount === 0 ? 0 : 1,
            }}
          />
        </div>
        {/* Neon Gradient Button */}
        <button
          type="submit"
          disabled={!isComplete}
          className={`
            w-full py-3 mt-1 rounded-lg text-white font-bold text-lg tracking-wide relative overflow-hidden
            transition-all duration-500
            ${isComplete
              ? "bg-gradient-to-r from-[#37a0ff] via-[#7d5fff] to-[#f84fff] shadow-[0_2px_32px_#7d5fff99] hover:scale-105 neon-glow cursor-pointer"
              : "bg-[#292847] opacity-50 cursor-not-allowed"}
          `}
        >
          <span className="relative z-10">{isComplete ? "สมัครงาน" : "กรอกข้อมูลให้ครบ"}</span>
          {isComplete && (
            <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white opacity-10 blur-[8px] animate-shine pointer-events-none" />
          )}
        </button>
        {/* Neon Flicker/shine */}
        <style>{`
          .neon-flicker {
            text-shadow: 0 0 8px #7d5fff, 0 0 16px #7d5fff88, 0 0 32px #7d5fff99;
            animation: flicker 2s infinite linear alternate;
          }
          @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              opacity:1;
              text-shadow: 0 0 8px #7d5fff, 0 0 16px #7d5fff88, 0 0 32px #7d5fff99;
            }
            20%, 22%, 24%, 55% {
              opacity:0.7;
              text-shadow: 0 0 4px #7d5fff, 0 0 8px #7d5fff55;
            }
          }
          .neon-glow {
            box-shadow: 0 0 16px 4px #7d5fff66, 0 2px 24px 0 #37a0ff77;
          }
          .animate-shine {
            animation: shine 2.2s cubic-bezier(0.4,0.2,0.2,1) infinite;
          }
          @keyframes shine {
            0% { left: -75%; }
            60% { left: 120%; }
            100% { left: 120%; }
          }
          @media (max-width: 400px) {
            form { padding: 1rem !important; }
          }
        `}</style>
      </form>
    </div>
  );
}

export default RegisterPage;