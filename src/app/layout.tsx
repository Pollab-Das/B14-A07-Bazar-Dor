import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import PriceTicker from "@/components/shared/PriceTicker";
import Footer from "@/components/shared/Footer";
import { api } from "@/lib/api";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let tickerItems = [];
  try {
    tickerItems = await api.getProducts();
  } catch {
    tickerItems = [];
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