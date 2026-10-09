import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="text-7xl mb-4">🧭</div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-gray-500 mb-6">
        আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="inline-block bg-green-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}