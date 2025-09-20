import { Input } from "../ui/input"
import { Search, Sparkles } from "lucide-react"

export const Main = () => {
    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Explore Characters
                    </h1>
                </div>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Discover their stories, powers, and destinies in immersive conversations
                </p>
            </div>

            {/* Search Section */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#b565a7] rounded-full flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-[#b565a7] text-xl font-semibold">Find Your Perfect Character</h2>
                    </div>
                    
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b565a7]/50" />
                        <Input 
                            className="bg-[#b565a7]/10 border-[#b565a7]/30 text-[#b565a7] placeholder:text-[#b565a7]/50 focus:border-[#b565a7] focus:ring-[#b565a7]/30 h-14 rounded-xl pl-12 text-lg font-medium"
                            placeholder="Search by name, personality, or tags..."
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 gap-6">
                    
                </div>
            </div>
        </div>
    )
}
