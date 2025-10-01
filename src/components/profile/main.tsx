import { fetchUserDetails } from "@/app/actions/User";
import { User, Calendar, Mail, Sparkles, Plus } from "lucide-react"
import Link from "next/link"

export const Main = async () => {
    let userData;
    
    try{
        const data = await fetchUserDetails(); // Use the server action directly
        if(!data.success || !data.user){
            return(
                <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
                    <div className="text-center">
                        <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl backdrop-blur-sm">
                            {data.message || "Server error, please try again later."}
                        </div>
                    </div>
                </div>
            )
        }
        userData = data.user;
    }catch(error){
        console.log(error);
        return(
            <div className="pt-10 px-6 pb-4 md:px-20 lg:px-32">
                <div className="text-center">
                    <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-xl backdrop-blur-sm">
                        Server error, please try again later.
                    </div>
                </div>
            </div>
        )
    }

   
    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return(
        <div className="pt-10 px-6 pb-8 md:px-20 lg:px-32">
        
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Profile
                </h1>
                <p className="text-slate-300 text-lg">Manage your account and personas</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
                    <div className="flex items-start gap-6">
                        
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-white">
                                    {userData.username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">{userData.username}</h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <span>{userData.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <span>Member since {formatDate(userData.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800">Your Personas</h3>
                            <span className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full font-medium border border-slate-200">
                                {userData.personas.length}
                            </span>
                        </div>
                    </div>

                    {userData.personas.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {userData.personas.map((persona: {id:string, name: string, content: string, createdAt: Date}) => (
                                <div 
                                    key={persona.id}
                                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 transition-all duration-200 hover:bg-white hover:shadow-lg"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-lg font-semibold text-slate-800 capitalize">
                                            {persona.name}
                                        </h4>
                                        <span className="text-xs text-slate-600 bg-slate-200 px-2 py-1 rounded-full">
                                            {formatDate(persona.createdAt)}
                                        </span>
                                    </div>
                                    
                                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                        {persona.content}
                                    </p>
                                    
                                    <div className="flex gap-2">
                                        <button className="text-slate-600 hover:bg-indigo-600 hover:text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200 border border-slate-300 hover:border-indigo-600">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                                <Sparkles className="w-8 h-8 text-slate-400" />
                            </div>
                            <h4 className="text-lg font-medium text-slate-800 mb-2">No personas yet</h4>
                            <p className="text-slate-600 mb-6">Create your first AI persona to get started!</p>
                            <Link 
                                href="/createPersona"
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Persona
                            </Link>
                        </div>
                    )}
                </div>

                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        Account Stats
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-200">
                            <div className="text-2xl font-bold text-slate-800 mb-1">
                                {userData.personas.length}
                            </div>
                            <div className="text-sm text-slate-600">Personas</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-200">
                            <div className="text-2xl font-bold text-slate-800 mb-1">0</div>
                            <div className="text-sm text-slate-600">Conversations</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-200">
                            <div className="text-2xl font-bold text-slate-800 mb-1">0</div>
                            <div className="text-sm text-slate-600">Characters</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-200">
                            <div className="text-2xl font-bold text-slate-800 mb-1">
                                {Math.floor((new Date().getTime() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                            </div>
                            <div className="text-sm text-slate-600">Days Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
