"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import GoogleIcon from "@/components/auth/GoogleIcon";
import GitHubIcon from "@/components/auth/GitHubIcon";

export default function SignInForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await signIn.social({ provider, callbackURL: next });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="text-gray-500 text-sm mt-2">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold rounded-lg py-3.5 text-base hover:bg-green-700 disabled:opacity-60 transition shadow-sm"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-500">অথবা</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => social("google")}
              className="bg-white text-gray-700 rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm border border-gray-100"
            >
              <GoogleIcon size={18} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>
            <button
              type="button"
              onClick={() => social("github")}
              className="bg-white text-gray-700 rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm border border-gray-100"
            >
              <GitHubIcon size={18} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700 font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ←{" "}
          <Link href="/" className="hover:text-green-700">
            হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}