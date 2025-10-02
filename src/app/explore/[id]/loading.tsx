// app/explore/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating back button skeleton */}
      <div className="mt-4 ml-4 w-24 h-10 rounded-lg bg-slate-900/30 animate-pulse" />

      {/* Hero section */}
      <div className="relative h-[75vh] overflow-hidden">
        {/* Background image blur/fade skeleton */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20" />
        
        {/* Card overlay skeletons */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white/80 shadow-2xl backdrop-blur-sm bg-slate-300/40 animate-pulse" />
              </div>
              {/* Title and tags */}
              <div className="flex-grow text-center md:text-left text-white pb-2">
                <div className="h-12 md:h-16 w-56 md:w-96 rounded-lg bg-gradient-to-r from-slate-100/40 to-indigo-100/20 mb-4 mx-auto animate-pulse" />
                <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="bg-white/20 backdrop-blur-md text-white h-8 w-24 rounded-full animate-pulse" />
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/80 text-sm font-medium justify-center md:justify-start">
                  <div className="h-5 w-24 rounded bg-slate-700/30 animate-pulse" />
                  <div className="h-5 w-16 rounded bg-slate-700/30 animate-pulse" />
                  <div className="h-5 w-32 rounded bg-slate-700/30 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main cards section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-[25vh]">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="h-16 w-64 bg-white/15 rounded-2xl animate-pulse" />
            <div className="h-16 w-64 bg-purple-300/20 rounded-2xl animate-pulse" />
          </div>
          {/* Info/grid cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
              <div className="h-8 w-40 bg-purple-100/40 rounded-lg mb-6 animate-pulse" />
              <div className="space-y-4 text-slate-700">
                <div className="h-5 w-28 bg-slate-200/60 rounded mb-2 animate-pulse" />
                <div className="h-4 w-14 bg-purple-200/70 rounded mb-4 animate-pulse" />
                <div className="h-12 w-full bg-slate-200/40 rounded-lg animate-pulse" />
                <div className="h-4 w-2/3 bg-slate-200/40 rounded mb-2 animate-pulse" />
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
              <div className="h-8 w-32 bg-indigo-100/75 rounded-lg mb-6 animate-pulse" />
              <div className="flex flex-wrap gap-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="bg-gradient-to-r from-purple-100 to-indigo-100 h-8 w-24 rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full animate-pulse" />
                <div className="h-4 w-40 bg-slate-200/60 rounded mx-auto mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
