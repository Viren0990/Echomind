import { Navbar } from "../Navbar"
import { Main } from "./Main"

export const MyChatPage = () => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                <Navbar />      
                <Main />    
            </div>
        </div>
    )
}