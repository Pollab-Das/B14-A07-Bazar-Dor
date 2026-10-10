import { api } from "@/lib/api";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/shared/ProductCard";
import type { Product } from "@/types/bazardor";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await api.getProducts();
  } catch (err) {
    // API fail hole empty array — page crash hobe na 
    console.error("Failed to load products:", err);
  }

  if (products.length === 0) {
    return (
      <>
        <Hero />
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-3">⏳</div>
          <h2 className="font-bold text-xl mb-2 text-gray-900">
            পণ্যের দাম লোড হচ্ছে
          </h2>
          <p className="text-gray-500 mb-5">
            API server এ কিছুক্ষণ পর আবার চেষ্টা করুন
          </p>
          <a
            href="/"
            className="inline-block bg-green-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-green-700"
          >
            আবার চেষ্টা করুন
          </a>
        </div>
      </>
    );
  }

  const risers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Hero />
      {risers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="text-red-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
      {fallers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
      <section id="sob-ponno" className="scroll-mt-32">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
          <p className="text-gray-500 text-sm">
            মোট {products.length} টি পণ্যের আজকের দাম
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}