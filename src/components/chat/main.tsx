"use client"

import { fetchChat } from "@/app/actions/chats"
import { useState, useEffect, useRef } from "react"
import { Send, MoreVertical, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
    id: string
    content: string
    sender: "USER" | "AI"
    createdAt: Date
    chatId?: string
}

interface ChatData {
    id: string
    character: {
        profilePhotoURL: string | Blob | undefined
        id: string
        name: string
    }
    messages: Message[]
}

export const Main = ({ id }: { id: string }) => {
    const [chatData, setChatData] = useState<ChatData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState("")
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Fetch chat data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchChat(id)
                if (result.success) {
                    setChatData(result.data as ChatData)
                } else {
                    setError(result.data as string)
                }
            } catch (err) {
                setError("Failed to load chat")
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [id])

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatData?.messages])

    // Handle send message (placeholder - you'll need to implement the actual send function)
    const handleSendMessage = async () => {
        if (!newMessage.trim() || sending || !chatData) return
        
        setSending(true)
        // TODO: Implement actual message sending logic
        // For now, just add to local state
        const tempMessage: Message = {
            id: Date.now().toString(),
            content: newMessage,
            sender: "USER",
            createdAt: new Date()
        }
        
        setChatData(prev => prev ? {
            ...prev,
            messages: [...prev.messages, tempMessage]
        } : null)
        
        setNewMessage("")
        setSending(false)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        })
    }

    const handleBackClick = () => {
        router.back()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading chat...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-slate-900">
                <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-6 rounded-xl text-center max-w-md">
                    <h2 className="text-xl font-bold mb-2">Chat Error</h2>
                    <p>{error}</p>
                    <button 
                        onClick={handleBackClick}
                        className="mt-4 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    if (!chatData) return null

    return (
        <div className="flex flex-col h-screen w-full bg-slate-900">
            {/* Chat Header */}
            <div className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 p-4 flex items-center gap-3">
                {/* Back Button */}
                <button 
                    onClick={handleBackClick}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                
                {/* Character Info */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-slate-600">
                        <img 
                            src={chatData.character.profilePhotoURL} 
                            alt={chatData.character.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-lg">{chatData.character.name}</h1>
                        <p className="text-slate-400 text-sm">Online</p>
                    </div>
                </div>

                {/* More Options */}
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
                {chatData.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-slate-600">
                                <img 
                                    src={chatData.character.profilePhotoURL} 
                                    alt={chatData.character.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-slate-300 text-lg font-medium mb-2">
                                Start chatting with {chatData.character.name}
                            </h3>
                            <p className="text-slate-500 text-sm">
                                Say hello to begin your conversation!
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {chatData.messages.map((message, index) => {
                            const isUser = message.sender === "USER"
                            const showTime = index === 0 || 
                                chatData.messages[index - 1].sender !== message.sender ||
                                (message.createdAt.getTime() - chatData.messages[index - 1].createdAt.getTime()) > 300000 // 5 minutes

                            return (
                                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {!isUser && (
                                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-slate-600">
                                                <img 
                                                    src={chatData.character.profilePhotoURL} 
                                                    alt={chatData.character.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
                                            <div
                                                className={`px-4 py-3 rounded-2xl shadow-lg ${
                                                    isUser
                                                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                                                        : 'bg-slate-700/80 text-slate-100 border border-slate-600/50'
                                                }`}
                                            >
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                    {message.content}
                                                </p>
                                            </div>
                                            {showTime && (
                                                <span className="text-xs text-slate-500 px-1">
                                                    {formatTime(message.createdAt)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Message Input */}
            <div className="bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 p-4">
                <div className="bg-slate-700/50 rounded-2xl border border-slate-600/50 flex items-end gap-2 p-3">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        placeholder={`Message ${chatData.character.name}...`}
                        className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 resize-none max-h-32 min-h-[2.5rem] py-2 px-2 focus:outline-none rounded-lg"
                        rows={1}
                        style={{ scrollbarWidth: 'none' }}
                    />
                    
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sending}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                            newMessage.trim() && !sending
                                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:scale-105'
                                : 'text-slate-500 cursor-not-allowed bg-slate-600/30'
                        }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex items-center justify-between mt-2 px-2">
                    <span className="text-xs text-slate-500">
                        Press Enter to send, Shift+Enter for new line
                    </span>
                    <span className="text-xs text-slate-500">
                        {newMessage.length}/2000
                    </span>
                </div>
            </div>
        </div>
    )
}
