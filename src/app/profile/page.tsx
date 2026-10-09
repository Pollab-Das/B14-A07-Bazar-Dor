"use client";

import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.push("/signin?next=/profile");
    if (session) setName(session.user.name);
  }, [session, isPending, router]);

  async function update(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await authClient.updateUser({ name });
    setSaving(false);
    if (error) toast.error("আপডেট ব্যর্থ");
    else toast.success("তথ্য আপডেট হয়েছে");
  }

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending || !session) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-gray-900">আমার প্রোফাইল</h1>
      <p className="text-gray-500 text-sm mb-6">আপনার অ্যাকাউন্ট তথ্য দেখুন</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-600 text-white grid place-items-center text-xl font-bold">
            {session.user.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <div className="font-semibold text-lg text-gray-900">
              {session.user.name}
            </div>
            <div className="text-gray-500 text-sm">
              {session.user.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-red-600 border border-red-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold mb-4 text-gray-900">তথ্য</h2>
        <form onSubmit={update} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">নাম</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-600 text-white font-semibold rounded-lg py-3 hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? "সেভ হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}