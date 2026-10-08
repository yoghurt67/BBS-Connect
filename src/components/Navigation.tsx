import React from 'react';
import { Calendar, GraduationCap, MessageSquare, User } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadChatsCount?: number;
  unreadAnnouncementsCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  unreadChatsCount = 1,
  unreadAnnouncementsCount = 1,
}) => {
  const tabs = [
    {
      id: 'class' as TabType,
      label: 'Class',
      icon: GraduationCap,
      badge: unreadAnnouncementsCount > 0 ? unreadAnnouncementsCount : undefined,
    },
    {
      id: 'events' as TabType,
      label: 'Events',
      icon: Calendar,
    },
    {
      id: 'chats' as TabType,
      label: 'Chats',
      icon: MessageSquare,
      badge: unreadChatsCount > 0 ? unreadChatsCount : undefined,
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      id="bbs-bottom-nav"
      className="sticky bottom-0 z-30 bg-[#fcf9f8]/95 backdrop-blur-md border-t border-[#e5e2e1] px-3 py-1.5 shadow-[0_-2px_10px_rgba(0,30,64,0.03)]"
    >
      <div className="grid grid-cols-4 items-center justify-items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center w-full py-1 group transition-all cursor-pointer relative focus:outline-none"
            >
              {/* Active Pill Container */}
              <div
                className={`relative px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#001e40] text-white shadow-xs scale-105'
                    : 'text-[#575f65] group-hover:text-[#001e40] group-hover:bg-[#dbe3ea]/40'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />

                {/* Badge indicator */}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-[#fcf9f8]" />
                )}
              </div>

              {/* Tab Label */}
              <span
                className={`text-xs mt-0.5 tracking-tight transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#001e40]'
                    : 'font-medium text-[#575f65] group-hover:text-[#001e40]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
