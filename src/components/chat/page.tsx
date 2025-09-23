import { Navbar } from "../Navbar"
import { Main } from "./main"

export const Pagee = ({ id }: { id: string }) => {
    return(
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="relative z-10">
                    <Main id={id}/>        
                </div>
            </div>
        </div>
    )
}