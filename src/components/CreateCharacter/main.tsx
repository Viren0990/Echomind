import { Navbar } from "@/components/Navbar";
import { Form } from "./form"

export const Main = () => {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-pink-700 via-pink-600 to-pink-500 overflow-hidden">
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                <Navbar />
                <Form />    
            </div>
        </div>
    )
}