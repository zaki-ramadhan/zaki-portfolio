/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const MessageList = ({ messages, onDelete, loading }) => {
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-stone-500">
            <div className="w-10 h-10 border-2 border-stone-800 border-t-additional rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Loading messages...</p>
        </div>
    );

    if (messages.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 text-stone-600 bg-stone-900/20 rounded-[40px] border border-dashed border-white/5">
            <Icon icon="solar:letter-opened-broken" width="48" className="text-stone-500 opacity-50 mb-4" />
            <p className="text-sm font-semibold text-stone-500">No messages received yet.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2 mb-4">
                <h3 className="text-lg font-bold text-stone-400">Incoming Messages <span className="text-xs ml-2 bg-stone-800 px-2 py-0.5 rounded-full text-stone-500">{messages.length}</span></h3>
            </div>
            
            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className="group bg-stone-900/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl hover:border-additional/20 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-additional/10 flex items-center justify-center text-additional text-lg font-black italic">
                                    {msg.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-white text-base leading-tight">{msg.name}</h4>
                                    <span className="text-xs text-stone-500 font-medium">{msg.email}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => onDelete(msg.id)}
                                className="p-2 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                <Icon icon="solar:trash-bin-minimalistic-bold" width="18" />
                            </button>
                        </div>
                        
                        <div className="bg-black/20 p-4 rounded-2xl border border-white/5 mb-3">
                            <p className="text-sm text-stone-300 leading-relaxed whitespace-pre-wrap">
                                {msg.message}
                            </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-black text-stone-600">
                            <span>{new Date(msg.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList;
