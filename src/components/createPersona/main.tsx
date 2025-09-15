import { Navbar } from "@/components/Navbar";
import { Form } from "./form";
import qwq from "@/images/qwq.png";
import Image from 'next/image';


export const Main = () => {
    return(
        <div className="min-h-screen relative overflow-hidden">
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
                <Form />
            </div>
        </div>
    )
}