import Image from 'next/image';
import { Navbar } from "../Navbar";
import { Main } from "./main"
import qwq from "@/images/qwq.png";

export const ProfilePage = () => {
    return(
        <div className="min-h-screen relative bg-gradient-to-br from-pink-600 via-pink-600 to-pink-500 overflow-hidden">
            <Image
                            src={qwq}
                            alt="Hero background"
                            fill
                            priority
                            className="object-cover object-center"
                            placeholder="blur"
                            quality={90}
                        />
            
            <div className="relative z-10">
                <div className="border-b-1 pt-13 border-gray-300"></div>
                <Navbar />
                <Main />
            </div>
        </div>
    )
}