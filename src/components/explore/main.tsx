import { Input } from "../ui/input"
import { Search, Sparkles, MessageCircle, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchAllCharacters } from "@/app/actions/character"
import { Grid } from "./charGrid"

export const Main = async () => {   
    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Explore Characters
                    </h1>
                </div>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                    Discover their stories, powers, and destinies in immersive conversations
                </p>
            </div>

            <Grid />
        </div>
    )
}
