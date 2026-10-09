import Link from "next/link";
import Image from "next/image";
import { todayBn } from "@/lib/format";

export default function Hero() {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-12 grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-10">
      <div>
        <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
          {todayBn()}
        </span>
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