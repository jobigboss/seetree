"use client";
import React, { useState, useRef } from "react";
import { FaUser, FaPhone, FaBuilding, FaUserTie } from "react-icons/fa";

const agencyOptions = ["ฝ่ายการตลาด", "ฝ่ายสื่อสารองค์กร", "ทีมอีเวนต์", "อื่นๆ"];
const positionOptions = ["Staff", "Supervisor", "Team Leader", "MC", "Promoter"];

export default function RegisterPage() {
  const [form, setForm] = useState({
    regName: "",
    regLastname: "",
    regTel: "",
    regAgency: "",
    regPosition: "",
  });

  // สำหรับ effect mouse BG
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const formRef = useRef();

  // Mouse move handler
  const handleMouseMove = (e) => {
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y, active: true });
  };

  // Mouse leave (หายแสง)
  const handleMouseLeave = () => {
    setMouse((m) => ({ ...m, active: false }));
  };

  // Validate
  const isComplete =
    form.regName.trim() &&
    form.regLastname.trim() &&
    form.regTel.trim().length === 10 &&
    form.regAgency &&
    form.regPosition;

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    alert(JSON.stringify(form, null, 2));
  };

  // Mouse BG style
  const glowStyle = mouse.active
    ? {
        background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, #00eaff66 0%, #7d5fff33 60%, transparent 100%)`,
        transition: "background 0.2s",
      }
    : {
        background: "radial-gradient(300px circle at 50% 0px, #00eaff22 0%, #7d5fff11 80%, transparent 100%)",
        transition: "background 0.4s",
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181924]">
      <form
        ref={formRef}
        className="relative z-10 w-full max-w-xs sm:max-w-sm bg-[#10101a] rounded-2xl border border-[#3926b0] shadow-[0_0_36px_4px_#7d5fff55] backdrop-blur-xl p-7 flex flex-col gap-5 overflow-hidden"
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
        <div className="flex items-center gap-2">
          <FaUser className="text-[#37a0ff] text-lg" />
          <input
            className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
              form.regName
                ? "border-[#37a0ff] shadow-[0_0_8px_#37a0ff66]"
                : "border-[#232337]"
            } text-white placeholder:text-[#7d5fff99] focus:outline-none focus:ring-2 focus:ring-[#37a0ff] transition`}
            value={form.regName}
            onChange={(e) => handleChange("regName", e.target.value)}
            placeholder="ชื่อ"
            required
          />
        </div>
        {/* Lastname */}
        <div className="flex items-center gap-2">
          <FaUser className="text-[#f84fff] text-lg" />
          <input
            className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
              form.regLastname
                ? "border-[#f84fff] shadow-[0_0_8px_#f84fff66]"
                : "border-[#232337]"
            } text-white placeholder:text-[#f84fff99] focus:outline-none focus:ring-2 focus:ring-[#f84fff] transition`}
            value={form.regLastname}
            onChange={(e) => handleChange("regLastname", e.target.value)}
            placeholder="นามสกุล"
            required
          />
        </div>
        {/* Tel */}
        <div className="flex items-center gap-2">
          <FaPhone className="text-[#7d5fff] text-lg" />
          <input
            className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
              form.regTel.length === 10
                ? "border-[#7d5fff] shadow-[0_0_8px_#7d5fff66]"
                : "border-[#232337]"
            } text-white placeholder:text-[#7d5fff99] focus:outline-none focus:ring-2 focus:ring-[#7d5fff] transition`}
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            value={form.regTel}
            onChange={(e) => handleChange("regTel", e.target.value.replace(/\D/, ""))}
            placeholder="เบอร์ 10 หลัก"
            required
          />
        </div>
        {/* Agency */}
        <div className="flex items-center gap-2">
          <FaBuilding className="text-[#37a0ff] text-lg" />
          <select
            className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
              form.regAgency
                ? "border-[#37a0ff] shadow-[0_0_8px_#37a0ff66]"
                : "border-[#232337]"
            } text-white focus:outline-none focus:ring-2 focus:ring-[#37a0ff] transition`}
            value={form.regAgency}
            onChange={(e) => handleChange("regAgency", e.target.value)}
            required
          >
            <option value="">เลือกสังกัด</option>
            {agencyOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* Position */}
        <div className="flex items-center gap-2">
          <FaUserTie className="text-[#f84fff] text-lg" />
          <select
            className={`flex-1 px-4 py-2 rounded-lg bg-[#181924] border ${
              form.regPosition
                ? "border-[#f84fff] shadow-[0_0_8px_#f84fff66]"
                : "border-[#232337]"
            } text-white focus:outline-none focus:ring-2 focus:ring-[#f84fff] transition`}
            value={form.regPosition}
            onChange={(e) => handleChange("regPosition", e.target.value)}
            required
          >
            <option value="">เลือกตำแหน่ง</option>
            {positionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#232337] overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7d5fff] via-[#37a0ff] to-[#f84fff] transition-all duration-700"
            style={{
              width: `${(Object.values(form).filter(Boolean).length / 5) * 100}%`,
              filter: isComplete ? "drop-shadow(0 0 16px #f84fff99)" : "",
              opacity: Object.values(form).filter(Boolean).length === 0 ? 0 : 1,
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
        `}</style>
      </form>
    </div>
  );
}
