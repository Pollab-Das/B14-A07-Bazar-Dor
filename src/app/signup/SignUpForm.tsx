"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import GoogleIcon from "@/components/auth/GoogleIcon";
import GitHubIcon from "@/components/auth/GitHubIcon";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  async function social(provider: "google" | "github") {
    await signIn.social({ provider, callbackURL: "/" });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            আকাউন্ট তৈরী করুন
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                নাম
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

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
              style={{
                backgroundColor:"#16A34A",
                color:"#FFFFFF"
              }}
              className="w-full font-semibold rounded-lg py-3.5 text-base transition shadow-sm hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "আকাউন্ট তৈরী করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-500">
                অথবা
              </span>
            </div>
          </div>

          {/* Social buttons — no border per Figma */}
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

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            আকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-700 font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to home */}
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