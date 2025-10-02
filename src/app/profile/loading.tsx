// app/profile/loading.tsx

export default function Loading() {
  return (
    <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-10 w-60 rounded-xl bg-slate-700/40 mx-auto mb-4" />
        <div className="h-6 w-96 rounded-lg bg-slate-700/30 mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* User Info Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 bg-slate-200 rounded-full" />
          </div>
          <div className="flex-1 min-w-0 space-y-4">
            <div className="h-7 rounded-xl bg-slate-300/50 w-48" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                <div className="h-5 w-64 rounded-lg bg-slate-300/40" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                <div className="h-5 w-52 rounded-lg bg-slate-300/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Personas Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-200 rounded-full" />
            </div>
            <div className="h-6 rounded-lg bg-slate-300/40 w-40" />
            <div className="h-5 rounded-full bg-slate-300/30 w-9" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-200/40 rounded-xl p-4 border border-slate-300 animate-pulse"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="h-5 w-40 rounded-lg bg-slate-300/60" />
                  <div className="h-4 w-16 rounded-lg bg-slate-300/50" />
                </div>
                <div className="h-16 rounded-lg bg-slate-300/50" />
                <div className="mt-3 h-6 w-24 rounded-lg bg-slate-300/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Account Stats Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-200 rounded-full" />
            </div>
            <div className="h-6 rounded-lg bg-slate-300/40 w-32" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 animate-pulse"
              >
                <div className="h-12 rounded-lg bg-slate-300/50 mb-1" />
                <div className="h-5 rounded-lg bg-slate-300/40 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
