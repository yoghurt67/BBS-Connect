import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  Check, 
  Camera, 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  FileQuestion, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StudentProfile } from '../types';

interface EditProfileModalProps {
  student: StudentProfile;
  onClose: () => void;
  onSave: (updated: Partial<StudentProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  student,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState(student.phone);
  const [selectedAvatar, setSelectedAvatar] = useState(student.avatarUrl);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      phone,
      avatarUrl: selectedAvatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Edit Student Profile</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Avatar selection */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={selectedAvatar}
                alt="Selected"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#001e40]/20 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 p-1.5 bg-[#001e40] text-white rounded-full">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs text-[#575f65] mt-2 mb-3">Select BBS Uniform Portrait</p>

            <div className="flex items-center gap-2">
              {sampleAvatars.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedAvatar(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedAvatar === url
                      ? 'border-[#001e40] ring-2 ring-[#001e40] scale-105'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="Avatar option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              Full Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none"
            />
          </div>

          <div className="p-3 bg-[#f6f3f2] rounded-xl text-xs text-[#575f65]">
            Official BBS ID (<strong className="text-[#1c1b1b]">2026001</strong>) and school email (<strong className="text-[#1c1b1b]">student1@bbs.sch.id</strong>) are managed by school registrar.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#575f65] hover:text-[#1c1b1b] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#001e40] hover:bg-[#003366] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NotificationModalProps {
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [prefs, setPrefs] = useState({
    announcements: true,
    examAlerts: true,
    chatMessages: true,
    timetableChanges: true,
    sound: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold">Notification Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 divide-y divide-[#f0eded]">
          {[
            { key: 'announcements', title: 'Class Announcements', desc: 'Notify instantly when teachers publish notices' },
            { key: 'examAlerts', title: 'Exam & Term Test Reminders', desc: 'Get 24-hour and 1-hour pre-exam alerts' },
            { key: 'chatMessages', title: 'Direct Faculty & Peer Messages', desc: 'Push notifications for incoming school chats' },
            { key: 'timetableChanges', title: 'Timetable Room & Substitute Updates', desc: 'Real-time room reassignment notices' },
            { key: 'sound', title: 'In-App Sound & Vibration', desc: 'Audio chime for incoming messages' },
          ].map((item) => (
            <div key={item.key} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[#1c1b1b]">{item.title}</h4>
                <p className="text-xs text-[#575f65] leading-relaxed">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(item.key as any)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  (prefs as any)[item.key] ? 'bg-[#001e40]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    (prefs as any)[item.key] ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-[#001e40] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003366] transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold">Privacy & Security</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-[#1c1b1b]">
          <div className="p-3.5 bg-[#e7effc] rounded-2xl border border-[#c3c6d1] flex items-start gap-3 text-[#003366]">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">BBS Institutional Encryption</p>
              <p className="text-[11px] mt-0.5 text-[#43474f]">
                All academic records, chat histories, and test results are guarded under Bina Bangsa School privacy protocol.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#f6f3f2] rounded-xl">
              <div>
                <p className="font-bold text-sm">Show Online Presence</p>
                <p className="text-[11px] text-[#575f65]">Allow classmates to see your active status in BBS Connect</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#001e40] accent-[#001e40]" />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f6f3f2] rounded-xl">
              <div>
                <p className="font-bold text-sm">Biometric Authentication</p>
                <p className="text-[11px] text-[#575f65]">Require FaceID / Fingerprint on launch</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#001e40] accent-[#001e40]" />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f6f3f2] rounded-xl">
              <div>
                <p className="font-bold text-sm">Active Session Device</p>
                <p className="text-[11px] text-[#575f65]">Student iPad Air • Jakarta, ID (Current)</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-[#001e40] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003366] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold">Help & Support</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#575f65] uppercase tracking-wider">
              Frequently Asked Questions
            </h4>
            {[
              { q: 'How do I download the latest exam timetable?', a: 'Navigate to Events tab and tap "Full Table" to export the official schedule.' },
              { q: 'Can I submit homework files late?', a: 'Check each subject card under the Class tab for specific deadline and teacher policies.' },
              { q: 'How do I join CCA drama auditions?', a: 'Check the Upcoming Events section on the Events page for rehearsal times.' },
            ].map((faq, i) => (
              <details key={i} className="p-3 bg-[#f6f3f2] rounded-xl text-xs group cursor-pointer">
                <summary className="font-bold text-[#1c1b1b] flex items-center justify-between list-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-2 text-[#575f65] leading-relaxed pl-1">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="p-3.5 bg-[#e7effc] rounded-2xl border border-[#c3c6d1] space-y-2 text-xs text-[#001e40]">
            <p className="font-bold flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> IT & Academic Support Desk
            </p>
            <p className="text-[11px] text-[#43474f]">
              Email: support@binabangsa.sch.id<br />
              Hotline: +62 21 588-3838 (Ext. 201)
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-[#001e40] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003366] transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border border-[#e5e2e1] animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-full bg-red-100 text-[#ba1a1a] flex items-center justify-center mx-auto mb-4">
          <LogOut className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h3 className="text-xl font-black text-[#1c1b1b] mb-1">Confirm Logout</h3>
        <p className="text-xs text-[#575f65] leading-relaxed mb-6">
          Are you sure you want to log out of BBS Connect on this device? You will need your student ID credentials to sign back in.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-xl text-xs font-bold bg-[#f0eded] text-[#43474f] hover:bg-[#e5e2e1] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl text-xs font-bold bg-[#ba1a1a] text-white hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
