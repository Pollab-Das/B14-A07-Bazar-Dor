export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-12 mb-10 h-72" />

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-4 h-32"
          />
        ))}
      </div>
    </div>
  );
}