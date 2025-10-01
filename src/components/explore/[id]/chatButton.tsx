"use client"

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { createChat } from "@/app/actions/chats";

type ChatButtonProps = {
  characterId: string;
  existingChatId: string | null;
};

export const ChatButton = ({ characterId, existingChatId }: ChatButtonProps) => {
    const router = useRouter();
   
    const handleClick = async () => {
        console.log("a");
        if (existingChatId) {
            router.push(`/chat/${existingChatId}`);
        }else { 
          
            try{
                const res = await createChat(characterId);
           
                if(!res.success || !res.chat){
                    alert("Error from server!");
                    return;
                }
              

                router.push(`/chat/${res.chat.id}`);
            }catch(error){
                console.log(error);
                alert("Error from server!")
            }
        }
    }

    return(
        <div>
        <button 
            onClick={handleClick}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xl font-bold py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 flex items-center justify-center gap-3 border border-purple-500/20">
            <MessageCircle className="w-6 h-6" />
            {existingChatId ? "Continue Chatting" : "Start Chatting"}
        </button>
        </div>
    )
}