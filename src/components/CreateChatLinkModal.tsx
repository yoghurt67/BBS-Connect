import React, { useState } from 'react';
import { X, Link2, Copy, Check, QrCode, Share2, Users, ShieldCheck, Clock } from 'lucide-react';

interface CreateChatLinkModalProps {
  onClose: () => void;
}

export const CreateChatLinkModal: React.FC<CreateChatLinkModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [chatType, setChatType] = useState<'study_group' | 'project' | 'peer_tutoring'>('study_group');
  const [expiryHours, setExpiryHours] = useState<string>('24');
  const [showQR, setShowQR] = useState(false);

  const generatedLink = `https://bbs.connect.sch.id/invite/${chatType}-sec3-${Math.random().toString(36).substring(2, 8)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        {/* Header */}
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cca830] text-blue-950 flex items-center justify-center font-bold">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Create School Chat Link</h2>
              <p className="text-xs text-blue-200">BBS Connect Secure Invitation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Chat Category */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-2">
              Select Chat Purpose
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'study_group', label: 'Study Group' },
                { id: 'project', label: 'Class Project' },
                { id: 'peer_tutoring', label: 'Peer Tutor' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setChatType(item.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                    chatType === item.id
                      ? 'bg-[#001e40] text-white border-[#001e40] shadow-xs'
                      : 'bg-[#f6f3f2] text-[#43474f] border-transparent hover:bg-[#e5e2e1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Link Display */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-2">
              Sharable Invite URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#f0eded] p-3 rounded-xl text-xs font-mono text-[#001e40] truncate select-all border border-[#e5e2e1]">
                {generatedLink}
              </div>
              <button
                onClick={handleCopy}
                className="bg-[#001e40] hover:bg-[#003366] text-white p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* QR Code toggle */}
          <div className="p-3 bg-[#f6f3f2] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1c1b1b]">
              <QrCode className="w-4 h-4 text-[#003366]" />
              <span>Show QR Code for Classroom Projection</span>
            </div>
            <button
              onClick={() => setShowQR(!showQR)}
              className="text-xs font-bold text-[#003366] hover:underline cursor-pointer"
            >
              {showQR ? 'Hide QR' : 'Display QR'}
            </button>
          </div>

          {showQR && (
            <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#e5e2e1] rounded-2xl animate-in fade-in">
              <div className="w-36 h-36 bg-gray-900 rounded-xl p-2 flex items-center justify-center text-white text-[10px] text-center font-mono">
                [QR: {chatType}-sec3-bbs]
              </div>
              <p className="text-[11px] text-[#575f65] mt-2">Scan with BBS Connect Student App</p>
            </div>
          )}

          {/* Security details */}
          <div className="p-3 bg-[#e7effc] rounded-xl flex items-start gap-2.5 text-xs text-[#003366]">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Only verified BBS students in <strong className="font-semibold">Sec 3 Logic</strong> and authorized teachers can join through this link.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#575f65] hover:text-[#1c1b1b] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCopy();
              setTimeout(onClose, 800);
            }}
            className="bg-[#001e40] hover:bg-[#003366] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Link Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Copy & Share Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
