import type { Product, Category } from "@/types/bazardor";

const BASES = [
  "https://api.abcz.workers.dev/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
];

async function fetcher<T>(path: string): Promise<T> {
  let lastError: Error | null = null;

  for (const base of BASES) {
    try {
      const url = `${base}${path}`;
      console.log(`[API] Trying: ${url}`);

      const res = await fetch(url, {
        cache: "no-store", 
      });

      console.log(`[API] Response: ${res.status} ${url}`);

      if (res.ok) {
        return res.json();
      }

      lastError = new Error(`API error: ${res.status} ${path}`);
    } catch (err: any) {
      console.log(`[API] Failed: ${base} - ${err.message}`);
      lastError = err;
    }
  }

  throw lastError || new Error("All API endpoints failed");
}

export const api = {
  getProducts: () => fetcher<Product[]>("/products"),
  getProductsByCategory: (slug: string) =>
    fetcher<Product[]>(`/products?category=${slug}`),
  getProductById: (id: number | string) =>
    fetcher<Product>(`/products/${id}`),
  getCategories: () => fetcher<Category[]>("/categories"),
  getCategory: (slug: string) =>
    fetcher<Category>(`/categories/${slug}`),
};