"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { todayBn } from "@/lib/format";

const NAV_ITEMS = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    window.location.href = "/";
  }

  // User fallback
  const userImage = session?.user?.image || null;
  const userName = session?.user?.name || "";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top row — logo + auth */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-600 grid place-items-center p-2 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={28}
                height={28}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <div>
              <div className="font-bold text-xl leading-none text-gray-900">
                বাজার দর
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {todayBn()}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? null : session ? (
              <>
                {/* User Info — Image + Name */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {userImage ? (
                    // Google/GitHub image
                    <Image
                      src={userImage}
                      alt={userName}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    // Fallback 
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white grid place-items-center text-sm font-bold shrink-0">
                      {userName?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {userName}
                  </span>
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 border border-red-300 rounded-lg px-3 py-1.5 flex items-center gap-1 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">সাইন আউট</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-700 hover:text-green-700"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-semibold bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* categories */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {NAV_ITEMS.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span>{c.icon}</span>
                {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}