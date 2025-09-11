"use client"

import { TagName } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { TAGS } from "@/lib/tags";
import { Upload, Heart, User, MessageSquare, Settings, CheckCircle, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { uploadCharacter } from "@/app/actions/character";
import Image from "next/image";

export const Form = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<TagName[]>([]);
    const [personality, setPersonality] = useState("");
    const [scenario, setScenario] = useState("");
    const [initialMessage, setinitialMessage] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [tokenCount, setTokenCount] = useState(0);

    // Token estimation function (OpenAI's rule: ~4 characters per token)
    const estimateTokens = (text: string) => {
        return Math.ceil(text.length / 4);
    };

    // Update token count when personality or scenario changes
    useEffect(() => {
        const personalityTokens = estimateTokens(personality);
        const scenarioTokens = estimateTokens(scenario);
        setTokenCount(personalityTokens + scenarioTokens);
    }, [personality, scenario]);

    const handleTagChange = (tag: TagName) => {
        setTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
       );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setMessage("Please upload only JPG, JPEG, PNG, or WebP images");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setMessage("Image size must be less than 5MB");
                return;
            }

            setProfilePhoto(file);
            
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            
            setMessage("");
        }
    };

    const removeImage = () => {
        setProfilePhoto(null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('character-image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!title || !description || !tags || !personality || !scenario || !initialMessage || !profilePhoto){
            setMessage("Please fill all the required fields");
            return;
        }
        setLoading(true);
        setMessage("");

        try{
            const res = await uploadCharacter({title,description,personality,scenario,initialMessage, profilePhoto, tags});
            if(res.success){
                setMessage("Character Created Successfully!");
                setTitle("");
                setDescription("");
                setTags([]);
                setProfilePhoto(null);
                setImagePreview(null);
                setPersonality("");
                setScenario("");
                setinitialMessage("");
            } else {
                setMessage(res.message || "Failed to create character");
            }
        }catch(error:any){
            setMessage("Unexpected error occurred please try again later!")
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                    Create a Character!
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Bring your imagination to life by creating unique AI characters with distinct personalities and stories
                </p>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div className={`max-w-4xl mx-auto mb-6 p-4 rounded-xl ${
                    message.includes("Successfully") 
                        ? "bg-green-500 border border-green-400/50 text-green-100" 
                        : "bg-red-500 border border-red-400/50 text-red-100"
                }`}>
                    {message}
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Image Upload Section */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center">
                                <Upload className="w-5 h-5 text-white" />
                            </div>
                            <Label className="text-white text-xl font-semibold">Character Image</Label>
                        </div>
                        
                        {!imagePreview ? (
                            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-pink-300/50 transition-colors bg-white/5">
                                <Upload className="w-12 h-12 text-white/70 mx-auto mb-4" />
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="character-image"
                                    required
                                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                />
                                <label 
                                    htmlFor="character-image" 
                                    className="cursor-pointer text-white font-medium hover:text-pink-200 transition-colors"
                                >
                                    Click to upload or drag and drop
                                </label>
                                <p className="text-white/60 text-sm mt-2">JPG, JPEG, PNG or WebP (Max 5MB)</p>
                            </div>
                        ) : (
                            <div className="border-2 border-white/30 rounded-xl p-4 bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="text-white font-medium">Image Selected</span>
                                        </div>
                                        <p className="text-white/80 text-sm">{profilePhoto?.name}</p>
                                        <p className="text-white/60 text-xs">
                                            {profilePhoto && (profilePhoto.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={removeImage}
                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/50 p-2 h-auto"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-4 rounded-lg p-4">
                            <ul className="text-sm text-white/70 space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Select an image as bot avatar - this will be the main image that other users see</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Accepted formats: PNG, JPG, JPEG, WebP • Maximum size: 5MB</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Basic Info Section */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Basic Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-white/90 font-medium">Character Name</Label>
                                <Input 
                                    required
                                    value={title}
                                    placeholder="Enter a unique name for your character"
                                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/30 h-12 rounded-xl"
                                    onChange={(e) => {setTitle(e.target.value)}}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-white/90 font-medium">Character Bio</Label>
                                <textarea 
                                    required
                                    value={description}
                                    placeholder="Provide a compelling description for your character..."
                                    className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/30 rounded-xl p-4 min-h-[100px] resize-none border"
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                />
                                <p className="text-sm text-white/70 bg-white/10 rounded-lg p-3">
                                    💡 This appears on your character card and helps with discovery, but doesn't influence responses
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center">
                                <Settings className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Character Tags</h2>
                        </div>

                        <p className="text-white/70 mb-4">Select tags that best describe your character:</p>
                        <div className="flex flex-wrap gap-3">
                            {Object.keys(TAGS).map((tag) => (
                                <label key={tag} className="group cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={tags.includes(tag as TagName)}
                                        onChange={() => handleTagChange(tag as TagName)}
                                    />
                                    <div className="px-4 py-2 bg-white/10 border-2 border-white/30 rounded-full text-white/80 transition-all duration-200 peer-checked:bg-pink-500 peer-checked:border-pink-400 peer-checked:text-white peer-checked:shadow-lg hover:bg-white/20 hover:border-pink-300/50">
                                        {tag}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Character Definition Section */}
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">Character Definition</h2>
                            <span className="text-pink-300 text-sm bg-pink-500/20 px-3 py-1 rounded-full">The Heart of Your Character</span>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-white/90 font-medium">Personality</Label>
                                    <span className="text-xs text-pink-300 bg-pink-500/20 px-2 py-1 rounded-full">
                                        {estimateTokens(personality)} tokens
                                    </span>
                                </div>
                                <textarea 
                                    required
                                    value={personality}
                                    placeholder="Describe your character's persona, traits, and how they interact with others..."
                                    className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                    onChange={(e) => {setPersonality(e.target.value)}}
                                />
                                <p className="text-sm text-white/70 bg-white/10 rounded-lg p-3">
                                    ✨ Define how your character thinks, feels, and behaves in conversations
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-white/90 font-medium">Scenario</Label>
                                    <span className="text-xs text-pink-300 bg-pink-500/20 px-2 py-1 rounded-full">
                                        {estimateTokens(scenario)} tokens
                                    </span>
                                </div>
                                <textarea 
                                    required
                                    value={scenario}
                                    placeholder="Outline the context and setting for your character's conversations..."
                                    className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                    onChange={(e)=>{setScenario(e.target.value)}}
                                />
                                <p className="text-sm text-white/70 bg-white/10 rounded-lg p-3">
                                    🌍 Set the stage - where and when do conversations take place?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Initial Message Section */}
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-pink-500/30 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-white text-xl font-semibold">First Impression</h2>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-white/90 font-medium">Initial Message</Label>
                            <textarea 
                                required
                                value={initialMessage}
                                placeholder="Craft an engaging first message that showcases your character's personality..."
                                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 focus:ring-pink-400/30 rounded-xl p-4 min-h-[120px] resize-none border"
                                onChange={(e)=>{setinitialMessage(e.target.value)}}
                            />
                            <p className="text-sm text-white/70 bg-white/10 rounded-lg p-3">
                                💬 Make it detailed and engaging to encourage longer, more immersive conversations
                            </p>
                        </div>
                    </div>

                    {/* Token Counter Display */}
                    <div className="flex justify-center">
                        <div className="bg-white/10 backdrop-blur-sm border border-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg">
                            <Zap className="w-5 h-5 text-pink-400" />
                            <span className="text-white/90 font-medium text-lg">
                                Permanent tokens - <span className="text-pink-300 font-bold">{tokenCount}</span>
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-md h-14 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white">
                            <Heart className="w-5 h-5 mr-2" />
                            {loading? "Creating...":"Create Character"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
