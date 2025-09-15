import { fetchUserDetails } from "@/app/actions/User"
import { User, Calendar, Mail, Sparkles, Plus } from "lucide-react"
import Link from "next/link"

export const Main = async () => {
    let userData;
    
    try{
        const data = await fetchUserDetails();
        if(!data.success || !data.user){
            return(
                <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
                    <div className="text-center">
                        <div className="bg-red-600/20 border border-red-400/50 text-red-100 p-4 rounded-xl">
                            Server error, please try again later.
                        </div>
                    </div>
                </div>
            )
        }
        userData = data.user;
    }catch(error){
        return(
            <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
                <div className="text-center">
                    <div className="bg-red-600/20 border border-red-400/50 text-red-100 p-4 rounded-xl">
                        Server error, please try again later.
                    </div>
                </div>
            </div>
        )
    }

    // Format date helper function
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Profile
                </h1>
                <p className="text-slate-200 text-lg">Manage your account and characters</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* User Info Card */}
                <div className="bg-[#b565a7] backdrop-blur-sm rounded-2xl border border-white p-6 shadow-lg">
                    <div className="flex items-start gap-6">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-[#b565a7]">
                                    {userData.username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-white mb-2">{userData.username}</h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white">
                                    <Mail className="w-4 h-4 text-white" />
                                    <span>{userData.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-white">
                                    <Calendar className="w-4 h-4 text-white" />
                                    <span>Member since {formatDate(userData.createdAt.toISOString())}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Characters Section */}
                <div className="bg-[#b565a7] backdrop-blur-sm rounded-2xl border border-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-[#b565a7]" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Your Personas</h3>
                            <span className="bg-white text-[#b565a7] text-sm px-3 py-1 rounded-full font-medium">
                                {userData.personas.length}
                            </span>
                        </div>
                        
                        <Link 
                            href="/createPersona"
                            className="bg-white hover:bg-slate-100 text-[#b565a7] px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium border border-white"
                        >
                            <Plus className="w-4 h-4" />
                            Create New
                        </Link>
                    </div>

                    {userData.personas.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {userData.personas.map((persona: any) => (
                                <div 
                                    key={persona.id}
                                    className="bg-[#d084c0] rounded-xl p-4 border border-white transition-colors duration-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-lg font-semibold text-white capitalize">
                                            {persona.name}
                                        </h4>
                                        <span className="text-xs text-white bg-[#b565a7] px-2 py-1 rounded-full">
                                            {formatDate(persona.createdAt)}
                                        </span>
                                    </div>
                                    
                                    <p className="text-white text-sm leading-relaxed mb-3">
                                        {persona.content}
                                    </p>
                                    
                                    <div className="flex gap-2">
                                        <button className="text-white hover:bg-white hover:text-[#b565a7] px-3 py-1 rounded text-sm font-medium transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-[#b565a7]" />
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">No characters yet</h4>
                            <p className="text-slate-200 mb-6">Create your first AI character to get started!</p>
                            <Link 
                                href="/create"
                                className="bg-white hover:bg-slate-100 text-[#b565a7] px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Persona
                            </Link>
                        </div>
                    )}
                </div>

                {/* Stats Card */}
                <div className="bg-[#b565a7] backdrop-blur-sm rounded-2xl border border-white p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-[#b565a7]" />
                        </div>
                        Account Stats
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-[#d084c0] rounded-lg border border-white">
                            <div className="text-2xl font-bold text-white mb-1">
                                {userData.personas.length}
                            </div>
                            <div className="text-sm text-white">Personas</div>
                        </div>
                        
                        <div className="text-center p-4 bg-[#d084c0] rounded-lg border border-white">
                            <div className="text-2xl font-bold text-white mb-1">0</div>
                            <div className="text-sm text-white">Conversations</div>
                        </div>
                        
                        <div className="text-center p-4 bg-[#d084c0] rounded-lg border border-white">
                            <div className="text-2xl font-bold text-white mb-1">0</div>
                            <div className="text-sm text-white">Characters</div>
                        </div>
                        
                        <div className="text-center p-4 bg-[#d084c0] rounded-lg border border-white">
                            <div className="text-2xl font-bold text-white mb-1">
                                {Math.floor((new Date().getTime() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                            </div>
                            <div className="text-sm text-white">Days Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
