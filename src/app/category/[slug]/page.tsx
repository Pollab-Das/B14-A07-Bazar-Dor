import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import CategoryClient from "@/components/category/CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let category, products;
  try {
    category = await api.getCategory(slug);
    products = await api.getProductsByCategory(slug);
  } catch {
    notFound();
  }

  return <CategoryClient category={category} products={products} />;
}