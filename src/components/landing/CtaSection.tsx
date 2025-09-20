import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export const CstSection = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-slate-800 hover:bg-slate-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105">
            {session ? "Explore" : "Create Free Account"}
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
