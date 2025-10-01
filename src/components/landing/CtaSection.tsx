export const CstSection = async () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-blue-900/20"></div>
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Begin?
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of adventurers already exploring infinite worlds and creating unforgettable stories.
        </p>
        
      </div>
    </div>
  );
};
