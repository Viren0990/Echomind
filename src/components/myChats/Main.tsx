import { fetchMyChats } from "@/app/actions/chats";
import { ArrowRight, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { ChatItem } from "@/types";
import { DeleteChatProvider } from "@/components/DeleteChatContext";
import { DeleteChatButton } from "@/components/DeleteChatButton";

const ChatsList = async () => {
  let data: ChatItem[] | string | undefined;

  try {
    const res = await fetchMyChats();

    if (!res.success || !res.data) {
      return (
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-6 rounded-xl text-center backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-2">Unable to Load Chats</h2>
              <p>There was an error loading your conversations. Please try again later.</p>
            </div>
          </div>
        </div>
      );
    } else {
      data = res.data;
    }
  } catch (error) {
    return (
      <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-6 rounded-xl text-center backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-2">Unexpected Error</h2>
            <p>Something went wrong while loading your chats. Please refresh the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Your Conversations
        </h1>
        <p className="text-slate-300 text-lg">Continue your adventures with AI characters</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {Array.isArray(data) && data.length > 0 ? (
          <div className="space-y-4">
            {data.map((chat) => (
              <div key={chat.id} className="group block relative">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-white">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-indigo-300 transition-colors shadow-lg">
                        <img
                          src={chat.character.profilePhotoURL}
                          alt={chat.character.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2 truncate">
                          {chat.character.title}
                        </h1>
                        <div className="flex items-center gap-1 text-slate-600">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">
                            {chat._count.messages} message{chat._count.messages !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        {/* Delete Button */}
                        <DeleteChatButton 
                          chatId={chat.id} 
                          characterName={chat.character.title} 
                        />
                        
                        {/* Continue Chat Button */}
                        <Link 
                          href={`/explore/${chat.character.id}`}
                          className="bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 text-slate-700 group-hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-2"
                        >
                          Continue Chat
                          <ArrowRight className="hidden sm:block w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : Array.isArray(data) && data.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <MessageSquare className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Conversations Yet</h3>
            <p className="text-slate-300 text-lg max-w-md mx-auto mb-8">
              Start chatting with AI characters to see your conversations here!
            </p>
            <Link 
              href="/explore"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
            >
              <User className="w-5 h-5" />
              Explore Characters
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 text-white max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
              <p className="text-slate-300">
                {typeof data === "string" ? data : "No chats found"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component wrapped with provider
export const Main = () => {
  return (
    <DeleteChatProvider>
      <ChatsList />
    </DeleteChatProvider>
  );
};
