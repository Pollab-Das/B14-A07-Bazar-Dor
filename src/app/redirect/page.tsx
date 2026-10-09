"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { hasVisited } from "@/lib/visitFlag";

function Redirector() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  useEffect(() => {
    const visited = hasVisited();
    if (visited) {
      router.replace(`/signin?next=${encodeURIComponent(next)}`);
    } else {
      router.replace(`/signup?next=${encodeURIComponent(next)}`);
    }
  }, [next, router]);

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">একটু অপেক্ষা করুন...</p>
      </div>
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          লোড হচ্ছে...
        </div>
      }
    >
      <Redirector />
    </Suspense>
  );
}