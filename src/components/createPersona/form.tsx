"use client"

import { FileType2, Heart, UserRoundPen } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { createPersona } from "@/app/actions/User"

export const Form = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !content){
            setError("Please fill all the required fields");
            return;
        }
        setLoading(true);
        setError("");

        try{
            const res = await createPersona({name, content});
            if(res.success){
                setName("");
                setContent("");
            }else {
                setError(res.message || "Failed to create persona");
            }
        }catch(error:any){
            setError("Unexpected error occurred please try again later!")
        }finally{
            setLoading(false);
        }
    } 

    return (
        <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
    
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Create a Persona!
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                    Let's start by building your own persona that will be sent to characters you chat with
                </p>
            </div>

      
            {error && (
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl text-center backdrop-blur-sm">
                        {error}
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl space-y-6">
                      
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <UserRoundPen className="w-5 h-5 text-white"/>
                                </div>
                                <Label className="text-slate-800 text-xl font-semibold">Name</Label>
                            </div>
                            <Input 
                                required
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                                className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/30 h-12 rounded-xl"
                                placeholder="This will be the name that will be used in your chats to refer to you."
                            />
                        </div>

                      
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <FileType2 className="w-5 h-5 text-white"/>
                                </div>
                                <Label className="text-slate-800 text-xl font-semibold">Content</Label>
                            </div>
                            <textarea 
                                required
                                value={content}
                                onChange={(e) => {setContent(e.target.value)}}
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                placeholder="Here's where you put details about your persona, like their gender, background etc."
                            />
                        </div>

                
                        <div className="bg-slate-100 rounded-lg p-4">
                            <ul className="text-sm text-slate-600 space-y-2"> 
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                                    This is the information that will be sent along with your message to your character.
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                                    Make it short and concise with only important information.
                                </li>
                            </ul>
                        </div>

                   
                        <div className="flex justify-center pt-4">
                            <Button 
                                type="submit"
                                disabled={loading}
                                className="w-full max-w-md h-14 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 border border-white/20"
                            >
                                <Heart className="w-5 h-5 mr-2" />
                                {loading ? "Creating..." : "Create Persona"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
