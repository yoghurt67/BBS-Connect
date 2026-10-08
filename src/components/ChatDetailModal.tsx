import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  CheckCheck,
  Sparkles,
  User
} from 'lucide-react';
import { ChatThread, ChatMessage } from '../types';

interface ChatDetailModalProps {
  thread: ChatThread;
  onClose: () => void;
  onSendMessage: (threadId: string, text: string) => void;
}

export const ChatDetailModal: React.FC<ChatDetailModalProps> = ({
  thread,
  onClose,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread.messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText;
    setInputText('');
    onSendMessage(thread.id, messageText);

    // Simulate quick intelligent teacher/admin reply
    setTimeout(() => {
      setIsTyping(true);
    }, 700);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Thank you for confirming! I have noted your update.';
      if (thread.participantName.toLowerCase().includes('principal')) {
        replyText = 'Thank you for checking in. Keep up the high standard of academic leadership at BBS!';
      } else if (thread.participantName.toLowerCase().includes('teacher')) {
        replyText = 'Great question! Please review Chapter 5 exercises 3 and 4 before tomorrow’s tutorial.';
      } else if (thread.participantName.toLowerCase().includes('admin')) {
        replyText = 'Your request has been filed in the BBS student registry database. A formal receipt is available.';
      } else if (thread.participantName.toLowerCase().includes('parent')) {
        replyText = 'Have a great study session at school today, dear!';
      }
      onSendMessage(thread.id, replyText);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 md:p-4">
      <div className="bg-[#fcf9f8] w-full h-full md:max-w-md md:h-[90vh] md:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Chat Header */}
        <header className="bg-[#001e40] text-white px-4 py-3.5 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              {thread.avatar ? (
                <img
                  src={thread.avatar}
                  alt={thread.participantName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#dbe3ea] text-[#001e40] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
              {thread.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#001e40] rounded-full"></span>
              )}
            </div>

            <div>
              <h3 className="font-bold text-sm tracking-tight text-white leading-tight">
                {thread.participantName}
              </h3>
              <p className="text-[11px] text-blue-200 truncate max-w-[170px]">
                {thread.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white/80">
            <button
              onClick={() => alert(`Calling ${thread.participantName} via BBS School Telecom...`)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert(`Initiating secure video conference with ${thread.participantName}...`)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Security Banner */}
        <div className="bg-[#e7effc] px-4 py-1.5 text-[11px] text-[#003366] font-medium flex items-center justify-center gap-1 border-b border-[#c3c6d1]">
          <Sparkles className="w-3 h-3" />
          <span>Official BBS School Channel • Encrypted & Monitored</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f6f3f2]/60">
          {thread.messages.map((msg) => {
            const isMe = msg.isMe;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#001e40] text-white rounded-br-xs'
                      : 'bg-white text-[#1c1b1b] border border-[#e5e2e1] rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div
                  className={`flex items-center gap-1 text-[10px] text-[#737780] mt-1 px-1 ${
                    isMe ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#003366]" />}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#575f65] bg-white border border-[#e5e2e1] px-3.5 py-2 rounded-2xl w-fit">
              <span className="w-1.5 h-1.5 bg-[#001e40] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#001e40] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#001e40] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] ml-1">{thread.participantName} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={handleSend}
          className="bg-white border-t border-[#e5e2e1] p-3 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            onClick={() => alert('Attachment picker: Select assignments, PDFs or photos')}
            className="p-2 text-[#575f65] hover:text-[#001e40] hover:bg-[#f0eded] rounded-full transition-colors cursor-pointer"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#f0eded] text-[#1c1b1b] placeholder-[#737780] text-sm px-4 py-2.5 rounded-full border border-transparent focus:border-[#001e40] focus:bg-white focus:outline-none transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              inputText.trim()
                ? 'bg-[#001e40] text-white hover:bg-[#003366] shadow-xs active:scale-95'
                : 'bg-[#e5e2e1] text-[#737780] cursor-not-allowed'
            }`}
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
