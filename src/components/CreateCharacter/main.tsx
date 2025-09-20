import { Navbar } from "@/components/Navbar";
import { Form } from "./form"

export const Main = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute top-20 left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                <Navbar />
                <Form />    
            </div>
        </div>
    )
}
