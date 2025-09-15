import { Main } from "@/components/explore/main"
import { Navbar } from "@/components/Navbar"

export default function Page(){
    return(
        <div className="min-h-screen relative bg-[#9b3c96] overflow-hidden">
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                    <Navbar />
   
                </div>
        </div>
    )
}