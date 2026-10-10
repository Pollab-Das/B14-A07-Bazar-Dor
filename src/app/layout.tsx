import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import PriceTicker from "@/components/shared/PriceTicker";
import Footer from "@/components/shared/Footer";
import { api } from "@/lib/api";
import type { Product } from "@/types/bazardor";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর এক নজরে।",
};

// ✅ Fallback ticker items — API fail hole dekhabe 
const FALLBACK_TICKER: Product[] = [
  { id: 1, slug: "sorno-machi-chal", nameBn: "স্বর্ণমাছি চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "kg", image: "🍚", today: 148, yesterday: 145, lastWeek: 142, lastMonth: 138, change: { dir: "up", pct: 2.1 }, markets: [] },
  { id: 2, slug: "miniket-chal", nameBn: "মিনিকেট চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "kg", image: "🍚", today: 99, yesterday: 102, lastWeek: 105, lastMonth: 100, change: { dir: "down", pct: -2.9 }, markets: [] },
  { id: 5, slug: "mosur-dal", nameBn: "মসুর ডাল", category: "dal", categoryNameBn: "ডাল", categoryIcon: "🫘", unit: "kg", image: "🫘", today: 142, yesterday: 138, lastWeek: 135, lastMonth: 132, change: { dir: "up", pct: 2.9 }, markets: [] },
  { id: 9, slug: "sorishar-tel", nameBn: "সরিষার তেল", category: "tel", categoryNameBn: "তেল", categoryIcon: "🛢️", unit: "litre", image: "🫙", today: 192, yesterday: 188, lastWeek: 184, lastMonth: 180, change: { dir: "up", pct: 2.1 }, markets: [] },
  { id: 12, slug: "alu", nameBn: "আলু", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥬", unit: "kg", image: "🥔", today: 30, yesterday: 32, lastWeek: 34, lastMonth: 36, change: { dir: "down", pct: -6.2 }, markets: [] },
  { id: 13, slug: "peyaj", nameBn: "পেঁয়াজ", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥬", unit: "kg", image: "🧅", today: 54, yesterday: 48, lastWeek: 45, lastMonth: 60, change: { dir: "up", pct: 12.5 }, markets: [] },
  { id: 17, slug: "rui-mach", nameBn: "রুই মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "kg", image: "🐟", today: 46, yesterday: 44, lastWeek: 42, lastMonth: 40, change: { dir: "up", pct: 4.5 }, markets: [] },
  { id: 19, slug: "ilish-mach", nameBn: "ইলিশ মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "kg", image: "🐠", today: 1850, yesterday: 1790, lastWeek: 1700, lastMonth: 1650, change: { dir: "up", pct: 3.4 }, markets: [] },
  { id: 22, slug: "murgi-r-mangsho", nameBn: "মুরগির মাংস", category: "mangsho", categoryNameBn: "মাংস", categoryIcon: "🍗", unit: "kg", image: "🍗", today: 225, yesterday: 228, lastWeek: 220, lastMonth: 215, change: { dir: "down", pct: -1.3 }, markets: [] },
  { id: 26, slug: "dim", nameBn: "ডিম", category: "dim-dui", categoryNameBn: "ডিম-দুধ", categoryIcon: "🥛", unit: "dozen", image: "🥚", today: 158, yesterday: 152, lastWeek: 148, lastMonth: 145, change: { dir: "up", pct: 3.9 }, markets: [] },
  { id: 30, slug: "ada", nameBn: "আদা", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🌶️", unit: "kg", image: "🫚", today: 85, yesterday: 78, lastWeek: 72, lastMonth: 70, change: { dir: "up", pct: 9 }, markets: [] },
  { id: 31, slug: "roshun", nameBn: "রসুন", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🌶️", unit: "kg", image: "🧄", today: 125, yesterday: 135, lastWeek: 140, lastMonth: 150, change: { dir: "down", pct: -7.4 }, markets: [] },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let tickerItems: Product[] = [];
  try {
    tickerItems = await api.getProducts();
    if (tickerItems.length === 0) {
      tickerItems = FALLBACK_TICKER;
    }
  } catch {
    tickerItems = FALLBACK_TICKER;   // ✅ API fail hole fallback
  }

  return (
    <html
      lang="bn"
      className={hind.variable}
      style={{ colorScheme: "light", backgroundColor: "#f7f8f6" }}
    >
      <body
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#f7f8f6", color: "#111827" }}
      >
        <Navbar />
        <PriceTicker items={tickerItems} />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-hind)",
              background: "#fff",
              color: "#111827",
            },
          }}
        />
      </body>
    </html>
  );
}