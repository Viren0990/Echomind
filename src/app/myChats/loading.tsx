// app/my-chats/loading.tsx

export default function Loading() {
  // Show 6 skeleton chat items as a typical page
  return (
    <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center mb-8">
        <div className="h-8 bg-slate-700/30 rounded-xl mx-auto mb-4 w-64 animate-pulse"/>
        <div className="h-5 bg-slate-700/20 rounded-lg mx-auto w-80 mb-2 animate-pulse"/>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl flex flex-wrap items-center gap-4 sm:gap-6 animate-pulse">
            {/* Avatar skeleton */}
            <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-200 bg-gradient-to-t from-slate-700/20 to-slate-200/10"/>

            {/* Title and message count skeleton */}
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-slate-300/50 rounded w-3/5 mb-2" />
              <div className="h-3 bg-slate-300/30 rounded w-1/2 mb-4" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-slate-300/40" />
                <div className="h-3 bg-slate-300/30 rounded w-16" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-shrink-0">
              <div className="h-10 w-20 rounded-lg bg-slate-300/30" />
              <div className="h-10 w-32 rounded-lg bg-slate-300/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
