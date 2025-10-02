export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 pb-8 md:px-20 lg:px-32 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-8 bg-slate-700/30 rounded-xl mx-auto mb-4 w-60"></div>
        <div className="h-5 bg-slate-700/20 rounded-lg mx-auto w-80 mb-2"></div>
        <div className="h-4 bg-slate-700/20 rounded-lg mx-auto w-40"></div>
      </div>

      {/* Skeleton grid for cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white/95 rounded-2xl border border-white/20 shadow-2xl p-4 flex flex-col">
            <div className="w-full h-32 sm:h-40 bg-gradient-to-t from-slate-700/20 to-slate-200/20 rounded-xl mb-4" />
            <div className="h-5 bg-slate-300/50 rounded w-3/4 mb-3" />
            <div className="h-3 bg-slate-300/30 rounded w-full mb-1" />
            <div className="h-3 bg-slate-300/30 rounded w-2/3 mb-5" />
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 gap-4">
              <div className="h-4 bg-slate-300/60 rounded w-16" />
              <div className="h-4 bg-slate-300/60 rounded w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}