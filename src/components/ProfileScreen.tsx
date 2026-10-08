import React, { useState } from 'react';
import { 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  Pencil, 
  ChevronRight, 
  Copy, 
  Check, 
  CreditCard, 
  Settings as SettingsIcon,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileScreenProps {
  student: StudentProfile;
  onEditProfile: () => void;
  onOpenNotifications: () => void;
  onOpenPrivacy: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  onEditProfile,
  onOpenNotifications,
  onOpenPrivacy,
  onOpenHelp,
  onLogout,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="px-4 py-5 space-y-6 pb-20 max-w-lg mx-auto">
      {/* Student Portrait & Name Header */}
      <div className="flex flex-col items-center text-center pt-2">
        {/* Large Portrait with Edit Pencil Badge */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-[#e5e2e1]">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Edit Badge */}
          <button
            onClick={onEditProfile}
            id="profile-edit-avatar-btn"
            className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#001e40] hover:bg-[#003366] text-white flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90 hover:ring-2 hover:ring-white"
            title="Edit student profile photo"
            aria-label="Edit Profile"
          >
            <Pencil className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Student Name & Class */}
        <h2 className="text-2xl font-black text-[#001e40] mt-3.5 tracking-tight">
          {student.name}
        </h2>
        <p className="text-sm font-medium text-[#575f65] mt-0.5">
          {student.grade}
        </p>
      </div>

      {/* Card 1: Account Information matching Image 1 */}
      <div className="bg-white border border-[#e5e2e1] rounded-2xl p-5 shadow-xs">
        {/* Card Title with Icon & Underline Divider */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#e5e2e1] mb-4 text-[#001e40]">
          <CreditCard className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-lg font-bold tracking-tight">Account Information</h3>
        </div>

        {/* Fields Stack */}
        <div className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              EMAIL ADDRESS
            </label>
            <div
              onClick={() => handleCopy(student.email, 'email')}
              className="bg-[#f6f3f2] hover:bg-[#eae7e7] transition-colors p-3 rounded-xl text-sm font-semibold text-[#1c1b1b] flex items-center justify-between cursor-pointer group"
              title="Click to copy email"
            >
              <span className="truncate">{student.email}</span>
              <button className="text-[#575f65] group-hover:text-[#001e40] transition-colors p-1">
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-[11px] font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              STUDENT ID
            </label>
            <div
              onClick={() => handleCopy(student.studentId, 'studentId')}
              className="bg-[#f6f3f2] hover:bg-[#eae7e7] transition-colors p-3 rounded-xl text-sm font-semibold text-[#1c1b1b] flex items-center justify-between cursor-pointer group"
              title="Click to copy student ID"
            >
              <span>{student.studentId}</span>
              <button className="text-[#575f65] group-hover:text-[#001e40] transition-colors p-1">
                {copiedField === 'studentId' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-[11px] font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              ACADEMIC YEAR
            </label>
            <div className="bg-[#f6f3f2] p-3 rounded-xl text-sm font-semibold text-[#1c1b1b]">
              <span>{student.academicYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Settings matching Image 1 */}
      <div className="bg-white border border-[#e5e2e1] rounded-2xl p-5 shadow-xs">
        {/* Card Title with Icon & Underline Divider */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#e5e2e1] mb-2 text-[#001e40]">
          <SettingsIcon className="w-5 h-5 stroke-[2.2]" />
          <h3 className="text-lg font-bold tracking-tight">Settings</h3>
        </div>

        {/* Setting Options */}
        <div className="divide-y divide-[#f0eded]">
          {/* Notification Preferences */}
          <button
            onClick={onOpenNotifications}
            id="settings-notification-btn"
            className="w-full py-3.5 flex items-center justify-between text-left group cursor-pointer hover:bg-[#fcf9f8] px-1 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#dbe3ea] text-[#001e40] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-sm font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors">
                Notification Preferences
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#575f65] group-hover:text-[#001e40] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Privacy */}
          <button
            onClick={onOpenPrivacy}
            id="settings-privacy-btn"
            className="w-full py-3.5 flex items-center justify-between text-left group cursor-pointer hover:bg-[#fcf9f8] px-1 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#dbe3ea] text-[#001e40] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-sm font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors">
                Privacy
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#575f65] group-hover:text-[#001e40] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Help & Support */}
          <button
            onClick={onOpenHelp}
            id="settings-help-btn"
            className="w-full py-3.5 flex items-center justify-between text-left group cursor-pointer hover:bg-[#fcf9f8] px-1 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#dbe3ea] text-[#001e40] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-sm font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors">
                Help & Support
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#575f65] group-hover:text-[#001e40] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* Red Outlined Logout Button matching Image 1 */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          id="profile-logout-btn"
          className="w-full border-2 border-[#ba1a1a] text-[#ba1a1a] hover:bg-red-50 font-bold rounded-full py-3.5 px-6 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <LogOut className="w-5 h-5 stroke-[2.2]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
