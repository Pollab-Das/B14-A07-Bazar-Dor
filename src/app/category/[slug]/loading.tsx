// import { notFound } from "next/navigation";
// import { api } from "@/lib/api";
// import CategoryClient from "@/components/category/CategoryClient";

// export default async function CategoryPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   let category, products;
//   try {
//     category = await api.getCategory(slug);
//     products = await api.getProductsByCategory(slug);
//   } catch {
//     notFound();
//   }

//   return <CategoryClient category={category} products={products} />;
// }

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-24 bg-white rounded-2xl border border-gray-200 mb-5" />
      <div className="h-16 bg-white rounded-2xl border border-gray-200 mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-white rounded-2xl border border-gray-200"
          />
        ))}
      </div>
    </div>
  );
}