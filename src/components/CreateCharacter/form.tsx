"use client"

import { TagName } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { TAGS } from "@/lib/tags";
import { Upload, Heart, User, MessageSquare, Settings } from "lucide-react";
import { useState } from "react";

export const Form = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<TagName[]>([]);
    const [personality, setPersonality] = useState("");
    const [scenario, setScenario] = useState("");
    const [initialMessage, setinitialMessage] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleTagChange = (tag: TagName) => {
        setTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
       );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    }


    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                    Create a Character!
                </h1>
                <p className="text-pink-100 text-lg max-w-2xl mx-auto">
                    Bring your imagination to life by creating unique AI characters with distinct personalities and stories
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Image Upload Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <Upload className="w-5 h-5 text-pink-200" />
                            </div>
                            <Label className="text-white text-xl font-semibold">Character Image</Label>
                        </div>
                        
                        <div className="border-2 border-dashed border-pink-300/50 rounded-xl p-8 text-center hover:border-pink-300/70 transition-colors bg-pink-500/10">
                            <Upload className="w-12 h-12 text-pink-200 mx-auto mb-4" />
                            <Input
                                type="file"
                                className="hidden"
                                id="character-image"
                                required
                                onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                            />
                            <label 
                                htmlFor="character-image" 
                                className="cursor-pointer text-white font-medium hover:text-pink-200 transition-colors"
                            >
                                Click to upload or drag and drop
                            </label>
                        </div>
                        
                        <div className="mt-4 rounded-lg p-4">
                            <ul className="text-sm text-pink-100 space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-300 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Select an image as bot avatar - this will be the main image that other users see</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-300 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Accepted formats: PNG, JPG, JPEG • Maximum size: 5MB</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Basic Info Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-pink-200" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Basic Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-pink-100 font-medium">Character Name</Label>
                                <Input 
                                    required
                                    placeholder="Enter a unique name for your character"
                                    className="bg-pink-600/30 border-pink-400/50 text-white placeholder:text-pink-200/70 focus:border-pink-300 focus:ring-pink-300/30 h-12 rounded-xl"
                                    onChange={(e) => {setTitle(e.target.value)}}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-pink-100 font-medium">Character Bio</Label>
                                <textarea 
                                    required
                                    placeholder="Provide a compelling description for your character..."
                                    className="w-full bg-pink-600/30 border-pink-400/50 text-white placeholder:text-pink-200/70 focus:border-pink-300 focus:ring-pink-300/30 rounded-xl p-4 min-h-[100px] resize-none border"
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                />
                                <p className="text-sm text-pink-200/80 bg-pink-600/20 rounded-lg p-3">
                                    💡 This appears on your character card and helps with discovery, but doesn't influence responses
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <Settings className="w-5 h-5 text-pink-200" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Character Tags</h2>
                        </div>

                        <p className="text-pink-200/80 mb-4">Select tags that best describe your character:</p>
                        <div className="flex flex-wrap gap-3">
                            {Object.keys(TAGS).map((tag) => (
                                <label key={tag} className="group cursor-pointer">
                                    <input
                                        required
                                        type="checkbox"
                                        className="sr-only peer"
                                        onChange={() => handleTagChange(tag as TagName)}
                                    />
                                    <div className="px-4 py-2 bg-pink-600/30 border-2 border-pink-400/50 rounded-full text-pink-100 transition-all duration-200 peer-checked:bg-pink-500 peer-checked:border-pink-400 peer-checked:text-white peer-checked:shadow-lg hover:bg-pink-600/40 hover:border-pink-400/70">
                                        {tag}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Character Definition Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-pink-200" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Character Definition</h2>
                            <span className="text-pink-300 text-sm bg-pink-600/20 px-3 py-1 rounded-full">The Heart of Your Character</span>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-pink-100 font-medium">Personality</Label>
                                <textarea 
                                    required
                                    placeholder="Describe your character's persona, traits, and how they interact with others..."
                                    className="w-full bg-pink-600/30 border-pink-400/50 text-white placeholder:text-pink-200/70 focus:border-pink-300 focus:ring-pink-300/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                    onChange={(e) => {setPersonality(e.target.value)}}
                                />
                                <p className="text-sm text-pink-200/80 bg-pink-600/20 rounded-lg p-3">
                                    ✨ Define how your character thinks, feels, and behaves in conversations
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-pink-100 font-medium">Scenario</Label>
                                <textarea 
                                    required
                                    placeholder="Outline the context and setting for your character's conversations..."
                                    className="w-full bg-pink-600/30 border-pink-400/50 text-white placeholder:text-pink-200/70 focus:border-pink-300 focus:ring-pink-300/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                    onChange={(e)=>{setScenario(e.target.value)}}
                                />
                                <p className="text-sm text-pink-200/80 bg-pink-600/20 rounded-lg p-3">
                                    🌍 Set the stage - where and when do conversations take place?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Initial Message Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-pink-200" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">First Impression</h2>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-pink-100 font-medium">Initial Message</Label>
                            <textarea 
                                required
                                placeholder="Craft an engaging first message that showcases your character's personality..."
                                className="w-full bg-pink-600/30 border-pink-400/50 text-white placeholder:text-pink-200/70 focus:border-pink-300 focus:ring-pink-300/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                onChange={(e)=>{setinitialMessage(e.target.value)}}
                            />
                            <p className="text-sm text-pink-200/80 bg-pink-600/20 rounded-lg p-3">
                                💬 Make it detailed and engaging to encourage longer, more immersive conversations
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-md h-14 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-1 border-white">
                            <Heart className="w-5 h-5 mr-2" />
                            {loading? "Creating...":"Create Character"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
