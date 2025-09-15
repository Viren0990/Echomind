import { Navbar } from "@/components/Navbar";
import { Form } from "./form"

export const Main = () => {
    return (
        <div className="min-h-screen relative bg-[#b565a7] overflow-hidden">
            <div className="absolute top-20 left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 right-20 w-80 h-80 bg-[#d084c0]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="border-b border-gray-300/20 pt-3"></div>
                <Navbar />
                <Form />    
            </div>
        </div>
    )
}
