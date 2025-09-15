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
                setError(res.message || "Failed to create character");
            }
        }catch(error:any){
            setError("Unexpected error occurred please try again later!")
        }finally{
            setLoading(false);
        }
    } 

    return (
        <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
           
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Create a Persona!
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Lets start by building your own persona that will be sent to characters you chat with 
                </p>
            </div>

            {error && (
                <div className="border border-red-600 bg-red-500/20 rounded-xl p-4 mt-4">
                    <span className="text-white text-lg">Error creating persona, Please try again later.</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="bg-[#b565a7] backdrop-blur-sm rounded-2xl border-white border p-6 mt-4 space-y-4">
                    <div className="space-y-3">
                        <div className="inline-flex space-x-2 items-center">
                            <UserRoundPen className="text-white"/>
                            <Label className="text-white text-xl font-semibold">Name</Label>
                        </div>
                        <Input 
                            required
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30 h-12 rounded-xl"
                            placeholder="This will be the name that will be used in your chats to refer to you."
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="inline-flex space-x-2 items-center">
                            <FileType2 className="text-white"/>
                            <Label className="text-white text-xl font-semibold">Content</Label>
                        </div>
                        <textarea 
                            required
                            value={content}
                            onChange={(e) => {setContent(e.target.value)}}
                            className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30 rounded-xl p-4 min-h-[100px] resize-none border"
                            placeholder="Here's where you put details about your persona, like their gender, background etc."
                        />
                    </div>

                    <div>
                        <ul className="text-sm text-white/70 space-y-2"> 
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                This is the information that will be sent along with your message to your character.
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                Make it short and concise with only important information.
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-center pt-6">
                        <Button 
                            type="submit"
                            disabled={loading}
                            className="w-full max-w-md h-14 bg-white hover:bg-slate-100 text-[#b565a7] font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white"
                        >
                            {loading ? "Creating..." : "Create Persona"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
