import React from 'react';
import { Link2, User, CheckCheck, Plus, Sparkles } from 'lucide-react';
import { ChatThread } from '../types';

interface ChatsScreenProps {
  chatThreads: ChatThread[];
  onSelectChat: (thread: ChatThread) => void;
  onCreateChatLink: () => void;
  searchQuery?: string;
}

export const ChatsScreen: React.FC<ChatsScreenProps> = ({
  chatThreads,
  onSelectChat,
  onCreateChatLink,
  searchQuery = '',
}) => {
  const filteredThreads = chatThreads.filter((t) => {
    return (
      !searchQuery ||
      t.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="px-4 py-5 space-y-5 pb-20 max-w-lg mx-auto">
      {/* Create Chat Link Action Card matching Image 3 */}
      <div
        id="create-chat-link-card"
        onClick={onCreateChatLink}
        className="bg-white border border-[#e5e2e1] rounded-2xl p-4 flex items-center gap-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-[0.99]"
      >
        {/* Navy Circle Link Icon */}
        <div className="w-13 h-13 rounded-full bg-[#001e40] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
          <Link2 className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* Text Details */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors leading-tight">
            Create chat link
          </h3>
          <p className="text-xs text-[#575f65] mt-1 font-medium">
            Share a link for your school chat
          </p>
        </div>
      </div>

      {/* RECENT Section */}
      <section className="space-y-1">
        <div className="flex items-center justify-between px-1 mb-2">
          <h4 className="text-xs font-black text-[#575f65] uppercase tracking-widest">
            RECENT
          </h4>
          <span className="text-[11px] font-bold text-[#003366]">
            {filteredThreads.length} Active Conversations
          </span>
        </div>

        {/* Chat List Items with dividers */}
        <div className="bg-white border border-[#e5e2e1] rounded-2xl divide-y divide-[#f0eded] overflow-hidden shadow-xs">
          {filteredThreads.map((thread) => {
            const hasAvatar = Boolean(thread.avatar);

            return (
              <div
                key={thread.id}
                id={`chat-item-${thread.id}`}
                onClick={() => onSelectChat(thread)}
                className="p-3.5 flex items-center gap-3.5 hover:bg-[#fcf9f8] transition-colors cursor-pointer group active:bg-[#f6f3f2]"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  {hasAvatar ? (
                    <img
                      src={thread.avatar}
                      alt={thread.participantName}
                      className="w-13 h-13 rounded-full object-cover border border-[#e5e2e1] group-hover:ring-2 group-hover:ring-[#003366] transition-all"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-13 h-13 rounded-full bg-[#dbe3ea] text-[#001e40] flex items-center justify-center group-hover:bg-[#c3c6d1] transition-colors">
                      <User className="w-6 h-6 stroke-[2]" />
                    </div>
                  )}

                  {/* Online dot */}
                  {thread.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-[15px] font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors truncate">
                      {thread.participantName}
                    </h4>
                    <span className="text-xs text-[#737780] whitespace-nowrap shrink-0 font-medium">
                      {thread.lastMessageTime}
                    </span>
                  </div>

                  {/* Last Message Snippet */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-[#575f65] truncate font-normal leading-relaxed">
                      {thread.lastMessage}
                    </p>

                    {/* Unread badge if any */}
                    {thread.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-[#001e40] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shrink-0">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick BBS Student Help Tip */}
      <div className="p-3.5 bg-[#f0eded]/70 rounded-xl flex items-center gap-3 text-xs text-[#575f65]">
        <Sparkles className="w-4 h-4 text-[#003366] shrink-0" />
        <span>
          Faculty messages are encrypted and routed securely through BBS Connect.
        </span>
      </div>
    </div>
  );
};
