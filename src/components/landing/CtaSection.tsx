import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export const CstSection = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Begin?
        </h2>
        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
          Join thousands of adventurers already exploring infinite worlds and creating unforgettable stories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            {session ? "Explore" : "Create Free Account"}
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
