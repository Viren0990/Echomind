// app/createCharacter/loading.tsx

export default function Loading() {
  return (
    <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32 animate-pulse min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="h-12 w-96 bg-slate-700/40 rounded-xl mx-auto mb-4" />
        <div className="h-6 w-80 bg-slate-700/30 rounded-lg mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Image Upload Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="h-6 w-48 bg-slate-400/60 rounded-lg" />
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-16 bg-slate-50 mx-auto" />
          <div className="mt-4 space-y-2 text-slate-600 text-sm max-w-md mx-auto">
            <div className="h-4 bg-slate-400 rounded" />
            <div className="h-4 w-3/4 bg-slate-400 rounded" />
          </div>
        </div>
        
        {/* Basic Info Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="h-6 w-48 bg-slate-400/60 rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="h-12 rounded-xl bg-slate-300/50" />
            <div className="h-32 rounded-xl bg-slate-300/50" />
            <div className="h-4 w-96 rounded bg-slate-200/60" />
          </div>
        </div>

        {/* Tags Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="h-6 w-48 bg-slate-400/60 rounded-lg" />
          </div>
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-full bg-slate-300/50 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Definition Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="h-6 w-52 bg-slate-400/60 rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="h-20 rounded-xl bg-slate-300/50" />
            <div className="h-20 rounded-xl bg-slate-300/50" />
          </div>
        </div>

        {/* Initial Message Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="h-6 w-48 bg-slate-400/60 rounded-lg" />
          </div>
          <div className="h-32 rounded-xl bg-slate-300/50" />
        </div>

        {/* Token Count & Submit Button */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 shadow-2xl w-full max-w-md">
            <div className="w-5 h-5 bg-slate-600 rounded animate-pulse" />
            <div className="h-6 w-48 bg-slate-400/70 rounded-lg" />
          </div>

          <div className="h-14 w-full max-w-md bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-xl" />
        </div>
      </div>
    </div>
  );
}
