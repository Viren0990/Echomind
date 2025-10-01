import { MyChatPage } from "@/components/myChats/myChatPage";
export const dynamic = 'force-dynamic';

export default async function Page(){
    return(
        <div>
            <MyChatPage />
        </div>
    )
}