import React from 'react';
import { X, Megaphone, Calendar, User, FileText, Download, CheckCircle2, Share2 } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementDetailModalProps {
  announcement: Announcement;
  onClose: () => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        {/* Header */}
        <div className="bg-[#001e40] text-white p-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl shrink-0 mt-0.5">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="inline-block bg-[#cca830] text-blue-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-1.5">
                {announcement.tag}
              </span>
              <h2 className="text-lg font-bold leading-tight">{announcement.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta Info Bar */}
        <div className="bg-[#f6f3f2] px-5 py-3 border-b border-[#e5e2e1] flex flex-wrap items-center justify-between gap-2 text-xs text-[#575f65]">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#003366]" />
            <span className="font-semibold text-[#1c1b1b]">{announcement.author}</span>
            <span>({announcement.authorRole})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#003366]" />
            <span>{announcement.date} • {announcement.timestamp}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[60vh]">
          <div className="text-sm text-[#1c1b1b] leading-relaxed whitespace-pre-line space-y-3">
            <p>{announcement.content}</p>
            <p className="text-xs text-[#575f65] italic">
              Please direct any urgent questions to the respective subject teachers or via BBS Connect Chat.
            </p>
          </div>

          {/* Attachments */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#f0eded]">
              <h4 className="text-xs font-bold text-[#575f65] uppercase tracking-wider">
                Attached Study Materials & Documents ({announcement.attachments.length})
              </h4>
              <div className="space-y-2">
                {announcement.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#f6f3f2] hover:bg-[#e7effc] rounded-xl flex items-center justify-between border border-[#e5e2e1] transition-colors group cursor-pointer"
                    onClick={() => alert(`Downloading "${file.name}"...`)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-white rounded-lg text-[#003366] shadow-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-[#1c1b1b] group-hover:text-[#001e40] truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-[#737780] uppercase">{file.size} • {file.type}</p>
                      </div>
                    </div>
                    <button className="p-2 text-[#575f65] group-hover:text-[#001e40] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-between text-xs">
          <span className="text-[#575f65] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Read & Acknowledged
          </span>
          <button
            onClick={onClose}
            className="bg-[#001e40] hover:bg-[#003366] text-white font-bold px-5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
