export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-4 w-40 bg-gray-200 rounded" />
      <div className="h-40 bg-white rounded-2xl border border-gray-200" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-white rounded-2xl border border-gray-200" />
        <div className="h-28 bg-white rounded-2xl border border-gray-200" />
        <div className="h-28 bg-white rounded-2xl border border-gray-200" />
      </div>
      <div className="h-96 bg-white rounded-2xl border border-gray-200" />
    </div>
  );
}