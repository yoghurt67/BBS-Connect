import React from 'react';
import { ArrowLeft, Menu, Search } from 'lucide-react';
import { StudentProfile, TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  student: StudentProfile;
  onOpenSearch: () => void;
  onOpenMenu?: () => void;
  onBack?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  student,
  onOpenSearch,
  onOpenMenu,
  onBack,
  onProfileClick,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fcf9f8]/95 backdrop-blur-md px-4 py-3 border-b border-[#e5e2e1] transition-all">
      <div className="flex items-center justify-between">
        {/* Left Action / Avatar */}
        <div className="flex items-center gap-3">
          {currentTab === 'class' && (
            <button
              onClick={onProfileClick}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
              title="View student profile"
            >
              <div className="relative">
                <img
                  src={student.topRightAvatarUrl}
                  alt={student.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#003366]/20 shadow-xs group-hover:ring-2 group-hover:ring-[#003366] transition-all"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-[#001e40] tracking-tight leading-tight flex items-center gap-1.5">
                  {student.grade}
                </h1>
                <p className="text-xs font-medium text-[#575f65]">
                  {student.classSize || '25 students'}
                </p>
              </div>
            </button>
          )}

          {currentTab === 'events' && (
            <div className="flex items-center gap-3">
              <button
                onClick={onProfileClick}
                className="w-9 h-9 rounded-full bg-[#e5e2e1] text-[#43474f] flex items-center justify-center hover:bg-[#dbe3ea] transition-colors cursor-pointer"
                title="Profile"
              >
                <img
                  src={student.avatarUrl}
                  alt="Student"
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
              <h1 className="text-2xl font-extrabold text-[#001e40] tracking-tight">
                BBS Connect
              </h1>
            </div>
          )}

          {currentTab === 'chats' && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenMenu}
                className="p-1.5 -ml-1 text-[#001e40] hover:bg-[#e5e2e1] rounded-lg transition-colors cursor-pointer"
                title="Menu"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[2.5]" />
              </button>
              <h1 className="text-2xl font-extrabold text-[#001e40] tracking-tight">
                BBS Connect
              </h1>
            </div>
          )}

          {currentTab === 'profile' && (
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-1.5 -ml-1 text-[#001e40] hover:bg-[#e5e2e1] rounded-lg transition-colors cursor-pointer"
                title="Go Back"
                aria-label="Back to previous screen"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <h1 className="text-2xl font-extrabold text-[#001e40] tracking-tight">
                BBS Connect
              </h1>
            </div>
          )}
        </div>

        {/* Right Action: Search or Top Right Avatar */}
        <div className="flex items-center gap-2">
          {currentTab !== 'profile' ? (
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#001e40] hover:bg-[#dbe3ea]/60 rounded-full transition-colors cursor-pointer"
              title="Search BBS Connect"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <div className="relative">
              <img
                src={student.topRightAvatarUrl}
                alt="Student portrait"
                className="w-9 h-9 rounded-full object-cover border border-[#003366]/20 shadow-xs"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
