// app/explore/[id]/loading.tsx

export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-900">
      {/* Header skeleton */}
      <div className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 p-4 flex items-center gap-3">
        <div className="p-2 bg-slate-700/50 rounded-lg w-9 h-9" />
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-slate-600 to-slate-800 flex items-center justify-center border-2 border-slate-600" />
          <div>
            <div className="h-4 w-24 bg-slate-700/40 rounded mb-2" />
            <div className="h-3 w-14 bg-slate-700/30 rounded" />
          </div>
        </div>
        <div className="p-2 bg-slate-700/50 rounded-lg w-9 h-9" />
      </div>

      {/* Message placeholder skeletons */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI bubble */}
        <div className="flex justify-start">
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-slate-700/40 border border-slate-600 flex-shrink-0" />
            <div className="flex flex-col gap-1 items-start">
              <div className="px-6 py-4 rounded-2xl bg-slate-700/80 border border-slate-600/50 w-44 h-4 mt-2" />
            </div>
          </div>
        </div>
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="flex gap-3 max-w-[80%] flex-row-reverse">
            <div className="flex flex-col gap-1 items-end">
              <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 w-40 h-4 mt-2" />
            </div>
          </div>
        </div>
        {/* AI bubble 2 */}
        <div className="flex justify-start">
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-slate-700/40 border border-slate-600 flex-shrink-0" />
            <div className="flex flex-col gap-1 items-start">
              <div className="px-8 py-4 rounded-2xl bg-slate-700/80 border border-slate-600/50 w-72 h-4 mt-2" />
            </div>
          </div>
        </div>
        {/* User bubble 2 */}
        <div className="flex justify-end">
          <div className="flex gap-3 max-w-[80%] flex-row-reverse">
            <div className="flex flex-col gap-1 items-end">
              <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 w-28 h-4 mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Input box skeleton */}
      <div className="bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 p-4">
        <div className="bg-slate-700/50 rounded-2xl border border-slate-600/50 flex items-end gap-2 p-3">
          <div className="flex-1 bg-slate-800/60 rounded-lg h-10" />
          <div className="rounded-lg w-12 h-12 bg-slate-700/30" />
        </div>
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-xs text-slate-600 bg-slate-700/30 rounded w-40 h-4"></span>
          <span className="text-xs text-slate-600 bg-slate-700/30 rounded w-10 h-4"></span>
        </div>
      </div>
    </div>
  )
}
