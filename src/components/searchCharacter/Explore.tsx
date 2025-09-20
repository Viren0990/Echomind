import { Navbar } from "../Navbar"
import { Main } from "./main"

export const Explore = () => {
    return(
        <div className="min-h-screen relative bg-[#b565a7]/90 overflow-hidden">
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                <Navbar /> 
                <Main />            
            </div>
        </div>
    )
}