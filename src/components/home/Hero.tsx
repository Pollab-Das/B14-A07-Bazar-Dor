"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBn(n: number | string): string {
  return String(n).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

function getTodayBn(): string {
  const d = new Date();
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return `${days[d.getDay()]}, ${toBn(d.getDate())} ${
    months[d.getMonth()]
  }, ${toBn(d.getFullYear())}`;
}

export default function Hero() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(getTodayBn());
  }, []);

  return (
    <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-12 grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-10">
      <div>
        {/* ✅ Date badge — table-cell trick + explicit height */}
        <div className="mb-4">
          <span
            className="inline-block bg-green-50 text-green-700 rounded-full px-3.5"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "28px",
              height: "28px",
              overflow: "visible",
            }}
          >
            {dateStr || "\u00A0"}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Link
          href="#sob-ponno"
          className="inline-block bg-green-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-green-700 transition"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      <div className="flex justify-center">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের ফলমূল"
          width={360}
          height={360}
          className="w-full max-w-xs md:max-w-sm h-auto"
          priority
        />
      </div>
    </section>
  );
}